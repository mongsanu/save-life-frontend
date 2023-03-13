import Cookies from "js-cookie";
import Head from "next/head";
import router from "next/router";
import { useEffect } from "react";
import Signup from "../../../components/Admin/Signup";
import Layout from "../../../components/Layouts/MainLayout";
// import Image from 'next/image';
// import { get_all_blogs, get_all_users } from '../services/blog.service';
// import styles from '../styles/Home.module.css';

export default function Main(props: any) {
  const token = Cookies.get("access_token");
  useEffect(() => {
    if (token) {
      router.push("/admin");
    }
  }, [""]);
  return (
    <div>
      <Head>
        <title>Save Lives BD</title>
        <meta name="description" content="admin-panel-login" />
        {/* <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link> */}
        <link rel="icon" href="/logo.png" />
      </Head>

      <Layout>
        {
          !token
          ? <main>
              <Signup/>
          </main>
          : null
        }
      </Layout>
    </div>
  );
}
