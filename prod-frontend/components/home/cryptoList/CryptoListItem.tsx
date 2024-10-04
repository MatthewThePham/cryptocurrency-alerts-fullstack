import { Reveal } from "@/components/utils/Reveal";
import styles from "./cryptoList.module.scss";


interface Props {
  title: string;
  usd: string;
  usd_24h_change: string;
  description: string;
  tech: string[];
}

export const CryptoListItem = ({
  title,
  usd,
  usd_24h_change,
  description,
  tech,
  
}: Props) => {

  const getClassName = (val: string): string => {
    if (parseFloat(val) < 0.00) return styles.negative;
    if (parseFloat(val) === 0.00 ) return styles.zero;
    return styles.positive;
  };
  const className = getClassName(usd_24h_change);

  return (
    <div className={`${styles.cryptoList}  ${className}`}>
      <div className={styles.heading}>
        <Reveal>
          <div>
            <span className={styles.title}>{title}</span>
          </div>
        </Reveal>
        <Reveal>
          <div>
           <span>Daily </span>
            <span className={styles.price}>{usd_24h_change}%</span>
          </div>
        </Reveal>
      </div>

      <div className={styles.heading}>
        <Reveal>
          <span className={styles.price}>${usd}</span>
        </Reveal>
      </div>
      <Reveal>
        <p className={styles.description}>{description}</p>        
      </Reveal>
        <div className={styles.tech}>
          {tech.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
    </div>
  );
};
