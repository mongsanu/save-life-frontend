import Head from "next/head";
import AdminList from "../../components/Admin/AdminList";
import UserRequests from "../../components/BloodRequest/UserRequests";
import Donors from "../../components/Donors/Donors";
import Layout from "../../components/Layouts/MainLayout";

export default function Main(props: any) {
  const {token} = props || {};
  console.log({token});
  return (
    <div>
      <Head>
        <title>Save Lives BD</title>
        <meta name="description" content="admin-panel" />
        {/* <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link> */}
        <link rel="icon" href="/logo.png" />
      </Head>

      <Layout>
        {/* <Login/> */}
        <AdminList/>
        <UserRequests/>
        <Donors/>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  // token from cookie
  const token = context.req.cookies.access_token;
  if (!token) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token: token || null,
    },
  };
}
