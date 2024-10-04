import { SectionHeader } from "@/components/utils/SectionHeader";
import { CryptoListItem } from "./CryptoListItem";
import styles from "./cryptoList.module.scss";

import React from 'react';
import { CryptoData } from "../models/CryptoData";

interface Props {
  data: CryptoData;
}

export const CryptoList = ({ data }: Props) => {

  const cryptoList = [
    {
      title: "Bitcoin",
      usd: data.bitcoin.usd.toLocaleString(),
      usd_24h_change: data.bitcoin.usd_24h_change.toFixed(2),
      description:
        "First cryptocurrency built on blockchain technology used for transactions outside the control of any one group or entity.",
      tech: [
        "BTC",
        "Daily Volume " + data.bitcoin.usd_24h_vol.toLocaleString()
      ],
    },
    {
      title: "Ethereum",
      usd: data.ethereum.usd.toLocaleString(),
      usd_24h_change: data.ethereum.usd_24h_change.toFixed(2),
      description:
        "Proof-of-Stake blockchain that powers decentralized applications (dApps) through smart contracts.",
      tech: [
        "ETH",
        "Daily Volume " + data.ethereum.usd_24h_vol.toLocaleString()
      ],
    },
    {
      title: "Chainlink",
      usd: data.chainlink.usd.toLocaleString(),
      usd_24h_change: data.chainlink.usd_24h_change.toFixed(2),
      description:
        "Framework for building Decentralized Oracle Networks (DONs) that bring real-world data onto blockchain networks.",
      tech: [
        "LINK",
        "Daily Volume " + data.chainlink.usd_24h_vol.toLocaleString()
      ],
    }
  ];

  return (

    <section className="section-wrapper" id="cryptoList">
      <div className={styles.contactWrapper}>

      <SectionHeader title="Cryptocurrency" dir="l" />
      
      {cryptoList.map((item) => (
        <CryptoListItem key={item.title} {...item} />
      ))}
      </div>
    </section>
  );
};


