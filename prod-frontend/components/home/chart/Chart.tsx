import { Reveal } from "@/components/utils/Reveal";
import { SectionHeader } from "@/components/utils/SectionHeader";
import styles from "./chart.module.scss";


import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale,PointElement, Title, Tooltip, Legend);


//stats dropdown
import { AiFillCode } from "react-icons/ai";
import { useState } from 'react';

export const Chart = ({ dataParameter }) => {

    const [selected, setSelected] = useState('Bitcoin (BTC)');
    //const optionDropdown = ['Bitcoin (BTC)', 'Ethereum (ETH)', 'Chainlink (LINK)'];
    const optionDropdown = ['Bitcoin (BTC)', 'Ethereum (ETH)', 'Chainlink (LINK)'];
    const handleChange = (event) => {
      setSelected(event.target.value);     // sets optionDropdown for the dropdown
    };

    let labels;
    let bitcoinPrices;
    if(selected=='Bitcoin (BTC)'){
       labels = dataParameter.map(item => new Date(item.bitcoin.last_updated_at* 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
       bitcoinPrices = dataParameter.map(item => item.bitcoin.usd);
    }
    else if(selected=='Ethereum (ETH)'){
      labels = dataParameter.map(item => new Date(item.ethereum.last_updated_at* 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
      bitcoinPrices = dataParameter.map(item => item.ethereum.usd);
    }
    else if(selected=='Chainlink (LINK)'){
      labels = dataParameter.map(item => new Date(item.chainlink.last_updated_at* 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
      bitcoinPrices = dataParameter.map(item => item.chainlink.usd);
    }


    const chartData = {
      labels,
      datasets: [
        {
          label: selected,
          data: bitcoinPrices,
          borderColor: '#ff5faa',
          backgroundColor: '#ff5faa',
          borderWidth: 1,
          tension: 0.1,
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return `USD: $${tooltipItem.raw}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Price (USD)'
          }
        }
      }
    };


  return (
    <section className="section-wrapper" id="chart">
        <div >
            <Line data={chartData} options={options} />
        </div>
       
      <SectionHeader title="Chart" dir="l" />
      <div className={styles.chart}>
        <div>
          <Reveal>
            <p className={`${styles.chartText} ${styles.highlightFirstLetter}`}>
              Crypto hourly price chart in last 24 hours.
             </p>
          </Reveal>
          <Reveal>
            <p className={styles.chartText}>
              Swap tickers graphed using chart dropdown.
              Data source is hourly refreshed pull from coingecko.
            </p>
          </Reveal>
        </div>

        <div className={styles.stats}>
        <Reveal>
          <div className={styles.statColumn}>
            <h4>
              <AiFillCode size="2.4rem" color="var(--brand)" />
              <span>Chart Swap</span>
            </h4>
            <div className={styles.dropdownContainer}>
              <select className={styles.dropdown} value={selected} onChange={handleChange}>
                {optionDropdown.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>

            </div>
          </div>
        </Reveal>
      </div>

      </div>
    </section>
  );
};
