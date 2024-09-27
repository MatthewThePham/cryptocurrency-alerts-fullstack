package com.crypto.cryptobackend.model;
import com.fasterxml.jackson.annotation.JsonProperty;

public class cryptoItemModel {
    @JsonProperty("usd")
    private double usd;

    @JsonProperty("usd_24h_vol")
    private double usd_24h_vol;

    @JsonProperty("usd_24h_change")
    private double usd_24h_change;

    @JsonProperty("last_updated_at")
    private long last_updated_at;

    // Getters and Setters
    public double getUsd() {
        return usd;
    }
    public void setUsd(double usd) {
        this.usd = usd;
    }

    public double getUsd_24h_vol() {
        return usd_24h_vol;
    }
    public void setUsd_24h_vol(double usd_24h_vol) {
        this.usd_24h_vol = usd_24h_vol;
    }

    public double getUsd_24h_change() {
        return usd_24h_change;
    }
    public void setUsd_24h_change(double usd_24h_change) {
        this.usd_24h_change = usd_24h_change;
    }

    public long getLast_updated_at() {
        return last_updated_at;
    }
    public void setLast_updated_at(long last_updated_at) {
        this.last_updated_at = last_updated_at;
    }

    @Override
    public String toString() {
        return "CryptoData{" +
                "usd=" + usd +
                ", usd_24h_vol=" + usd_24h_vol +
                ", usd_24h_change=" + usd_24h_change +
                ", last_updated_at=" + last_updated_at +
                '}';
    }
}
