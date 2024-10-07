import { Reveal } from "@/components/utils/Reveal";
import styles from "./emailAlerts.module.scss";
import { AiFillMail } from "react-icons/ai";


import { useState, useEffect  } from 'react';

import { CryptoData } from '../models/CryptoData';

interface Props {
  data: CryptoData;
}

export const EmailAlerts = ({ data }: Props) =>  {

  const [submitted, setSubmitted] = useState(false); // State to manage form submission


  // State to store form data
  const [formData, setFormData] = useState({
    email: '',
    priceTarget: (limitDecimalPoints((data.bitcoin.usd*-.15)+data.bitcoin.usd)),
    ticker: 'BTC',
    currentPriceAtTheTime: data.bitcoin.usd
  });

  const tickers = ['BTC', 'ETH', 'LINK']
  
  type CryptoKeys = 'BTC' | 'ETH' | 'LINK';
  function getCryptoData(key: CryptoKeys) {
      return priceRanges[key];
  }

  // State for price range based on ticker
  const [priceRange, setpriceRanges] = useState<string[]>([]);


  // Mapping of prices to percent change ranges
  //const prices = ['-15%', '-10%','-5%','+5%', '+10%','+15%'];
  const priceRanges : { [key in CryptoKeys]: string[] } = {
    'BTC' : [
      limitDecimalPoints((data.bitcoin.usd*-.15)+data.bitcoin.usd),
      limitDecimalPoints((data.bitcoin.usd*-.10)+data.bitcoin.usd),
      limitDecimalPoints((data.bitcoin.usd*-.05)+data.bitcoin.usd),

      limitDecimalPoints((data.bitcoin.usd*.05)+data.bitcoin.usd),
      limitDecimalPoints((data.bitcoin.usd*.10)+data.bitcoin.usd),
      limitDecimalPoints((data.bitcoin.usd*.15)+data.bitcoin.usd)],

    'ETH' : [
      limitDecimalPoints((data.ethereum.usd*-.15)+data.ethereum.usd),
      limitDecimalPoints((data.ethereum.usd*-.10)+data.ethereum.usd),
      limitDecimalPoints((data.ethereum.usd*-.05)+data.ethereum.usd),

      limitDecimalPoints((data.ethereum.usd*.05)+data.ethereum.usd),
      limitDecimalPoints((data.ethereum.usd*.10)+data.ethereum.usd),
      limitDecimalPoints((data.ethereum.usd*.15)+data.ethereum.usd)],

    'LINK' : [
      limitDecimalPoints((data.chainlink.usd*-.15)+data.chainlink.usd),
      limitDecimalPoints((data.chainlink.usd*-.10)+data.chainlink.usd),
      limitDecimalPoints((data.chainlink.usd*-.05)+data.chainlink.usd),
      
      limitDecimalPoints((data.chainlink.usd*.05)+data.chainlink.usd),
      limitDecimalPoints((data.chainlink.usd*.10)+data.chainlink.usd),
      limitDecimalPoints((data.chainlink.usd*.15)+data.chainlink.usd)]
  };

  function limitDecimalPoints(value: number) {
    if (isNaN(value)) {
      throw new Error('Input must be a number');
    }
    return value.toFixed(2);
  }

  
  // Update price range when the selected ticker changes
  useEffect(() => {
    if(formData.ticker=='ETH'){
      formData.currentPriceAtTheTime = data.ethereum.usd
      formData.priceTarget = limitDecimalPoints((data.ethereum.usd*-.15)+data.ethereum.usd)  //defaults resets back to the first option if the ticker is swapped

    }
    else if(formData.ticker=='BTC'){
      formData.currentPriceAtTheTime = data.bitcoin.usd
      formData.priceTarget = limitDecimalPoints((data.bitcoin.usd*-.15)+data.bitcoin.usd)

    }
    else{
      formData.currentPriceAtTheTime = data.chainlink.usd
      formData.priceTarget = limitDecimalPoints((data.chainlink.usd*-.15)+data.chainlink.usd)
    }

    const range = getCryptoData(formData.ticker as CryptoKeys) || []; // Type assertion  //priceRanges[formData.ticker] || [];  //sets the range of price target dropdown to the corresponding ticker dropdown
    setpriceRanges(range);

    console.log("Price ticker has changed for "+ formData.priceTarget)
  }, [formData.ticker]),[formData.priceTarget];


  // Handle input changes, sets the JSON payload based on dropdowns
  const handleChange = (event: { target: { id: string; value: string; }; }) => {
    const { id, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  //helper function for displaying percent in price target
  const gainOrLoss = (targetPrice: number, purchasePrice: number) => Math.round((((targetPrice - purchasePrice) / purchasePrice) * 100) );
  
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

      //NEXT_PUBLIC naming convention needs to be followed
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      // Handle form submission, e.g., send data to an API
      try {
        //const response = await fetch('http://localhost:8080/api/emailAlerts', {
        const response = await fetch(`${apiUrl}/api/emailAlerts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result)

      } catch (error) {
        console.error('Error:', error);
      }
  
    ///
    setSubmitted(true); // Set the state to show the thank you message
  };

  return (
    <section className="section-wrapper" id="emailAlerts">
      <div className={styles.contentWrapper}>
          <h4 className={styles.contentTitle}>
            Price Alerts<span>.</span>
          </h4>
        <Reveal width="100%">
          <p className={styles.contentDescription}>
            Want a free automatic alert email if your coin hits a certain percent? {" "}  
            <span className={styles.text_color}>
              Percent up or down 5%, 10%, and 15%.
            </span>
            {" "} Recieve email which only sends if price is triggered in 30 days.
          </p>
        </Reveal>


      <div className={styles.container}>
            {!submitted ? (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="priceTarget" className={styles.label}>Price Target</label>
                <select
                  id="priceTarget"
                  value={formData.priceTarget}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                {
                  priceRange.map((priceTarget, index) => (
                  <option key={index} value={priceTarget}>
                    {"$" + priceTarget} {"(" + gainOrLoss(parseFloat(priceTarget),formData.currentPriceAtTheTime) + "%)"}
                  </option>
                  ))
                }
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="ticker" className={styles.label}>Ticker</label>
                <select
                  id="ticker"
                  value={formData.ticker} 
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  {tickers.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className={styles.buttonEmail}>
                      <AiFillMail size="2.4rem" />
                      <span>Send Email</span>
              </button>
            </form>
    ) : (
        <Reveal width="100%">
          <div className={styles.thankYouMessage}>
            <h1>Thank You!</h1>
            <p>Your form has been submitted successfully.</p>
          </div>
        </Reveal>
    )}
    </div>


      </div>
    </section>
  );
};
