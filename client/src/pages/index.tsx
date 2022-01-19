import Head from "next/head";
import React from "react";

import styles from "../styles/Home.module.css";
import { Home, Layout } from "../components";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <Home />
      </div>
    </>
  );
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};