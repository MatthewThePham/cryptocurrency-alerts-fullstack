import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from 'next/head';    //prevent auto zoom in

const poppins = Poppins({
  weight: ["100", "200", "400", "700", "900"],   
  display: "swap",
  subsets: ["latin"],
  variable: "--poppins-font",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id="root" className={poppins.className}>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />    
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
