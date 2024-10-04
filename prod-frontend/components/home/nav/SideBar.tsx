import { useEffect, useState } from "react";
import styles from "./sidebar.module.scss";
import { motion } from "framer-motion";

export const SideBar = () => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll(".section-wrapper");

    const options = {
      threshold: 0.3,
    };

    const callback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          setSelected(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    sections.forEach((section) => observer.observe(section));
  }, []);


  return (
    <div className={styles.shrinkOnMobile}>    
      <motion.nav
        initial={{ x: -70 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.sideBar}
      >
        <motion.a
          initial={{ x: -70 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          href="#cryptoList"
          onClick={() => setSelected("cryptoList")}
          className={selected === "cryptoList" ? styles.selected : ""}
        >
          Prices
        </motion.a>
        <motion.a
          initial={{ x: -70 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          href="#chart"
          onClick={() => {
            setSelected("chart");
          }}
          className={selected === "chart" ? styles.selected : ""}
        >
          Graphs
        </motion.a>
        <motion.a
          initial={{ x: -70 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          href="#emailAlerts"
          onClick={() => setSelected("emailAlerts")}
          className={selected === "emailAlerts" ? styles.selected : ""}
        >
          Alerts
        </motion.a>
      </motion.nav>
    </div>
  );
};
