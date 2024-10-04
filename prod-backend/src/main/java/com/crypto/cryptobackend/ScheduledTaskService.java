package com.crypto.cryptobackend;

import com.crypto.cryptobackend.model.emailAlertsModel;
import com.crypto.cryptobackend.model.cryptoWrapperModel;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

//import javax.annotation.PostConstruct;  //testing
import java.util.*;

@Service
public class ScheduledTaskService {

    // Define the URL you want to call, webclient does not like replacing commas with %2C it breaks url.
    // Don't = bitcoin%2Cethereum         Do = bitcoin,ethereum
    private static final String urlAPI = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,chainlink&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=2";

    @Value("${ENV_API_KEY}")
    private String apiKey;
    private final WebClient webClient;



    @Autowired
    private CosmosRepositoryData cosmosRepositoryData;

    @Autowired
    private EmailService emailService;
    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    public ScheduledTaskService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    //testing
    /*
    @PostConstruct
    public void init() {
        // Execute task immediately on startup
        performScheduledTask();
        performEmail();
    }
    */

    // Scheduled to run every hour api pull
    @Scheduled(cron = "0 0 * * * *")
    public void performScheduledTask() {
        System.out.println("Scheduled task executed at: " + new Date());

        try {
            // Create a WebClient request with custom headers
            Flux<cryptoWrapperModel> response = webClient.get()
                    .uri(urlAPI)
                    .header("Accept", "application/json")
                    .header("x-cg-demo-api-key", apiKey)  // Example header
                    .retrieve()  // Retrieve the response
                    .bodyToFlux(cryptoWrapperModel.class);  // Map the response body to a model

            response.subscribe(responseBody -> {
                        if (responseBody == null || responseBody.getBitcoin() == null) {
                            System.out.println("Response Body is empty or null");
                        } else {
                            try {

                                Mono<cryptoWrapperModel> savedData = cosmosRepositoryData.save(responseBody);
                                // Subscribe to the Mono to get the result
                                savedData.subscribe(
                                        savedEntity -> {
                                            // Handle the saved entity
                                            System.out.println("Saved entity: " + savedEntity.getBitcoin());
                                        },
                                        error -> {
                                            // Handle any errors that occurred
                                            System.err.println("Error saving entity: " + error.getMessage());
                                        }
                                );

                                System.out.println("Data fetched and stored successfully.");

                            } catch (Exception e) {
                                System.err.println("Error storing data: " + e.getMessage());
                            }
                        }
                    }
            );


        } catch (WebClientResponseException e) {
            System.out.println("Error accessing URL: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
        } catch (Exception e) {
            System.out.println("General error: " + e.getMessage());
        }
    }

    //Scheduled to check every hour
    @Scheduled(cron = "0 0 * * * *")
    public void performEmail() {
        //////////////////// email attempt
        Flux<cryptoWrapperModel> responseBody = cosmosRepositoryData.findAll();
        responseBody
                .sort((e1, e2) -> e2.getId().compareTo(e1.getId())) // Sort in descending order
                .next()  // Get the first element from the sorted stream
                .subscribe(compareField -> {

                    System.out.println("This is the first entry : " + compareField.getBitcoin() + "," + compareField.getEthereum() + "," + compareField.getChainlink());
                    Flux<emailAlertsModel> entities = emailRepository.findAll();

                    entities
                            .subscribe(entity -> {
                                double currentTickerPrice = 0;
                                double percentChangedLimit = 0.0;

                                double pricePercent = Math.round((((entity.getPriceTarget() - entity.getCurrentPriceAtTheTime()) / entity.getCurrentPriceAtTheTime()) * 100));

                                if (Objects.equals(entity.getTicker(), "BTC")) {
                                    currentTickerPrice = compareField.getBitcoin().getUsd();
                                    //currentTickerPrice = 80000;  //test value for BTC
                                } else if (Objects.equals(entity.getTicker(), "ETH")) {
                                    currentTickerPrice = compareField.getEthereum().getUsd();
                                    //currentTickerPrice = 1000;  //test value for ETH
                                } else {
                                    currentTickerPrice = compareField.getChainlink().getUsd();
                                }

                                percentChangedLimit = (currentTickerPrice * (pricePercent * .01)) + currentTickerPrice;

                                System.out.println("Percent Changed " + pricePercent);
                                System.out.print("Price limit  " + percentChangedLimit);
                                System.out.print("Price target  " + entity.getPriceTarget());

                                if (pricePercent > 0) {  //meaning it is +5, +10 or +15
                                    if (percentChangedLimit < entity.getPriceTarget()) {  //if currentPriceTicker (2624.51) < priceTarget (5593.43), that means they are asking for positive percent. IE Price increased a certain threshold.

                                        String subject = "Price Alert: " + entity.getTicker() + " is now $" + currentTickerPrice;
                                        String text = "The price of " + entity.getTicker() + " has increased above " + pricePercent + "%. Current price: $" + currentTickerPrice + ". Requested Price was $" + entity.getPriceTarget() + " or greater.";
                                        emailService.sendEmail(entity.getEmail(),subject, text);
                                        //emailService.sendEmail("example@test.com", subject, text);  //enter real dynamic email here, using test for now

                                        System.out.println("Reached email " + subject + text);

                                        emailRepository.delete(entity);
                                        System.out.println("deleting user...");
                                    }
                                } else {
                                    if (percentChangedLimit < entity.getPriceTarget()) {   //if currentPriceTicker (2624.51) > priceTarget (2230.83), that means they are asking for negative percent. IE Price falls below a certain threshold.
                                        String subject = "Price Alert: " + entity.getTicker() + " is now " + currentTickerPrice;
                                        String text = "The price of " + entity.getTicker() + " has dropped below " + pricePercent + "%. Current price: $" + currentTickerPrice + ". Requested price was $" + entity.getPriceTarget() + " or less.";
                                        emailService.sendEmail(entity.getEmail(),subject, text);
                                        //emailService.sendEmail("example@test.com", subject, text); //enter real dynamic email here, using test for now

                                        System.out.println("Reached email " + subject + text);

                                        emailRepository.delete(entity);
                                        System.out.println("deleting user...");
                                    }
                                }
                            }, error -> {
                                System.err.println("Error processing entities: " + error.getMessage());
                            });
                });

///////////////////
    }
}
