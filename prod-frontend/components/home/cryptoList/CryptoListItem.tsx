import { Reveal } from "@/components/utils/Reveal";
import styles from "./cryptoList.module.scss";


interface Props {
  title: string;
  price: string;
  time: number;
  description: string;
  tech: string[];
}

export const CryptoListItem = ({
  title,
  price,
  time,
  description,
  tech,
  
}: Props) => {

  const getClassName = (val: number): string => {
    if (val < 0.00) return styles.negative;
    if (val === 0.00 ) return styles.zero;
    return styles.positive;
  };
  const className = getClassName(time);

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
            <span className={styles.price}>{time}%</span>
          </div>
        </Reveal>
      </div>

      <div className={styles.heading}>
        <Reveal>
          <span className={styles.price}>${price}</span>
        </Reveal>
      </div>
      <Reveal>
        <p className={styles.description}>{description}</p>        
      </Reveal>
      <Reveal>
        <div className={styles.tech}>
          {tech.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
};
