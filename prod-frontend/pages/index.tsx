import Head from "next/head";
import { Home } from "@/components/home/Home";

export default function home() {
  return (
    <>
      <Head>
        <title>Crypto Trend</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="description" content="Crypto Trend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Home />
    </>
  );
}
