package com.crypto.cryptobackend;

import com.crypto.cryptobackend.model.emailAlertsModel;
import com.crypto.cryptobackend.model.cryptoWrapperModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class httpCosmosController {

    @Autowired
    private CosmosRepositoryData cosmosRepositoryData;
    @Autowired
    private EmailRepository emailRepository;

    @GetMapping("/last-24")
    public Flux<cryptoWrapperModel> getEntries() {   //making TTL on cosmosdb
        return cosmosRepositoryData.findAll();
    }

    @PostMapping("/emailAlerts")
    public ResponseEntity<Mono<emailAlertsModel>> createItem(@RequestBody emailAlertsModel item) {

        // Save the item to Cosmos DB
        Mono<emailAlertsModel> savedItem = emailRepository.save(item);

        // Return a response entity with the saved item and HTTP status 201 (Created)
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
    }

    // testing a simple string return
    @GetMapping("/test")
    public String sayHello() {
        return "Hello World";
    }

}
