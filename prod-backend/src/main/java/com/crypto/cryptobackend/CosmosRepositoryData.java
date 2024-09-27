package com.crypto.cryptobackend;

import com.azure.spring.data.cosmos.repository.ReactiveCosmosRepository;
import com.crypto.cryptobackend.model.cryptoWrapperModel;
import org.springframework.stereotype.Repository;

@Repository
public interface CosmosRepositoryData extends ReactiveCosmosRepository<cryptoWrapperModel, String> {  // leverage reactive programming for non-blocking operations.
}

