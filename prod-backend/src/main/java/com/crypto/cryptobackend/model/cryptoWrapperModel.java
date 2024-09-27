package com.crypto.cryptobackend.model;

import com.azure.spring.data.cosmos.core.mapping.Container;
import com.azure.spring.data.cosmos.core.mapping.PartitionKey;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;

import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)  //will exclude properties with null
@Container(containerName = "jsonModelContainer")
public class cryptoWrapperModel {
    @JsonProperty("bitcoin")
    private cryptoItemModel bitcoin;

    @JsonProperty("ethereum")
    private cryptoItemModel ethereum;

    @JsonProperty("chainlink")
    private cryptoItemModel chainlink;

    @Id
    private String id;

    @PartitionKey
    private String partition_key;

    // Constructor
    public cryptoWrapperModel() {
        this.id = UUID.randomUUID().toString(); // Auto-generate ID
        this.partition_key ="mainKey";
    }

    // Getters and Setters for wrapper class
    public String getPartitionKey() {
        return partition_key;
    }
    public void setPartitionKey(String partition_key) {
        this.partition_key = partition_key;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }


    public cryptoItemModel getBitcoin() {
        return bitcoin;
    }
    public void setBitcoin(cryptoItemModel bitcoin) {
        this.bitcoin = bitcoin;
    }


    public cryptoItemModel getEthereum() {
        return ethereum;
    }
    public void setEthereum(cryptoItemModel ethereum) {
        this.ethereum = ethereum;
    }

    public cryptoItemModel getChainlink() {
        return chainlink;
    }
    public void setChainlink(cryptoItemModel chainlink) {
        this.chainlink = chainlink;
    }

}
