import Head from 'next/head';
import React from 'react';
import Donors from '../../components/Donors/Donors';
import Layout from '../../components/Layouts/MainLayout';

export default function DonorIndex() {
  return (
    <React.Fragment>
      <Head>
        <title>Save Lives BD</title>
        <meta name="description" content="Registration page" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Layout>
        <Donors />
      </Layout>
    </React.Fragment>
  );
}
