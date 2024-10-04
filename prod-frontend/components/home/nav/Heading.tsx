import styles from "./heading.module.scss";
import { OutlineButton } from "../../buttons/OutlineButton";
import { MyLinks } from "./components/MyLinks";
import { CryptoData } from "../models/CryptoData";


interface Props {
  data: CryptoData;
}

export const Heading = ({ data }: Props) => {  
  return (
    <header className={styles.heading}>
      <MyLinks/>
      <OutlineButton>
        Refreshed {new Date(data.bitcoin.last_updated_at * 1000).toLocaleString([], {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: '2-digit',
          minute: '2-digit'
          })}
      </OutlineButton>
    </header>
  );
};

