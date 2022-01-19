import React from "react";
import Head from "next/head";

import { Layout, Order } from "../components";

export default function OrdersPage() {
  return (
    <>
      <Head>
        <title>Order</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Order />
    </>
  );
}

OrdersPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
