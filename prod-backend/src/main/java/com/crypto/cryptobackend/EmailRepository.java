package com.crypto.cryptobackend;

import com.azure.spring.data.cosmos.repository.ReactiveCosmosRepository;
import com.crypto.cryptobackend.model.emailAlertsModel;
import org.springframework.stereotype.Repository;

@Repository
//public interface EmailRepository extends CosmosRepository<email_alerts, String> {
public interface EmailRepository extends ReactiveCosmosRepository<emailAlertsModel, String> {
    //List<email_alerts> findFirstByOrderByIdAsc(); // Fetch the first entry
}
