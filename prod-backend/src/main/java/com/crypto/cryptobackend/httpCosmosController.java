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

   // @CrossOrigin(origins = "localhost", allowedHeaders = "*", methods = { RequestMethod.GET })
    @GetMapping("/last-24")
    public Flux<cryptoWrapperModel> getLast20Entries() {
        return cosmosRepositoryData.findAll().take(24);
        //return cosmosRepositoryData.findAll();
    }

    @PostMapping("/emailAlerts")
    public ResponseEntity<Mono<emailAlertsModel>> createItem(@RequestBody emailAlertsModel item) {

        // Save the item to Cosmos DB
        //email_alerts savedItem = emailRepository.save(item);
        Mono<emailAlertsModel> savedItem = emailRepository.save(item);

        // Return a response entity with the saved item and HTTP status 201 (Created)
        //return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);

    }


    // testing a simple string return
    @GetMapping("/test")
    public String sayHello() {
        return "Hello World";
    }

}
