import React from "react";
import { SideBar } from "../nav/SideBar";
import styles from "./home.module.scss";
import { Heading } from "../nav/Heading";
import { Chart } from "./chart/Chart";
import { CryptoList } from "./CryptoList/CryptoList";
import { EmailAlerts } from "./emailAlerts/EmailAlerts";

import { useState, useEffect } from 'react';


export const Home  = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.APIURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}`  // Adjust the API endpoint as necessary
        //const response = await fetch('http://localhost:8080/api/last-24'
          ,{method:'GET',
            headers:{Accept: 'application/json','Content-Type': 'application/json'}}); // Adjust the API endpoint as necessary
        if (!response.ok) {
          throw new Error('Network response was ' + response.statusText);
        }
        const result = await response.json();

        setData(result); // Assuming the response is an array and we need the first item
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return (
      <div className={styles.noData}>
      <p>No data available</p>
       </div>
    );
  }

  return (
    <>
      <div className={styles.home}>
        <SideBar />
        <main id="main">
          
          <Heading data={data[data.length-1]}/>
          <CryptoList data={data[data.length-1]}/>
          <Chart dataParameter={data}/>
          <EmailAlerts data={data[data.length-1]}/>
          
          <div
            style={{
              height: "200px",
              background:
                "linear-gradient(180deg, var(--background), var(--background-dark))",
            }}
          />
        </main>
      </div>
    </>
  );
};
