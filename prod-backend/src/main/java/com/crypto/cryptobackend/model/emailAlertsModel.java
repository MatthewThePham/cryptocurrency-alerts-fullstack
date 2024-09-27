package com.crypto.cryptobackend.model;

import com.azure.spring.data.cosmos.core.mapping.Container;
import com.azure.spring.data.cosmos.core.mapping.PartitionKey;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;

import java.util.UUID;


@Container(containerName = "emailAlertsContainer")
public class emailAlertsModel {
    @Id
    private String id;

    @PartitionKey
    private String partition_key;

    @JsonProperty("email")
    private String email;

    @JsonProperty("priceTarget")
    private double priceTarget;

    @JsonProperty("ticker")
    private String ticker;

    @JsonProperty("currentPriceAtTheTime")
    private double currentPriceAtTheTime;

    // Constructor
    public emailAlertsModel() {
        this.id = UUID.randomUUID().toString(); // Auto-generate ID
        this.partition_key ="mainKey";
        this.ticker = ticker;
        this.email = email;
        this.priceTarget = priceTarget;
        this.currentPriceAtTheTime = currentPriceAtTheTime;
    }

    public String getTicker() {
        return ticker;
    }
    public void setTicker(String crypto_ticker) {
        this.ticker = crypto_ticker;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public double getPriceTarget() {
        return priceTarget;
    }
    public void setPriceTarget(double price) {
        this.priceTarget = price;
    }

    public double getCurrentPriceAtTheTime() {
        return currentPriceAtTheTime;
    }
    public void setCurrentPriceAtTheTime(double currentPriceAtTheTime) {
        this.currentPriceAtTheTime = currentPriceAtTheTime;
    }

}
