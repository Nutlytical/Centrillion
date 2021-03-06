import React from "react";
import Head from "next/head";

import { Cart, Layout } from "../components";

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Cart />
    </>
  );
}

CartPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
