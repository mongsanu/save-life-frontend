import Head from 'next/head';
import React from 'react';
import BloodRequest from '../../components/BloodRequest/BloodRequest';
import UserRequests from '../../components/BloodRequest/UserRequests';
import Donors from '../../components/Donors/Donors';
import Layout from '../../components/Layouts/MainLayout';

export default function Request() {
  return (
    <div>
      <Head>
        <title>Blood Request</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Layout>
        <UserRequests/>
        <BloodRequest/>
        <Donors/>
      </Layout>
    </div>
  );
}
