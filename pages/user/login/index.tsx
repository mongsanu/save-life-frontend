import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import logo from "../../../public/logo.png";
import Link from 'next/link';
import cookies from "js-cookie";
import { Form, Input, Button, notification } from "antd";
import { useRouter } from 'next/router';
import Layout from '../../../components/Layouts/MainLayout';
import { user_login } from '../../../services/user.service';

export default function login() {
    const router = useRouter();
    const [form] = Form.useForm();

    const handleSubmit = async (values: any) => {
      console.log(values);
      const data_obj = {
        ...values,
        role_id: 3,
        user_role: "donor",
      }
      
      const login_result = await user_login(data_obj);
        const {data, status, message} = login_result;
        if(status) {
            // store token in local storage
            localStorage.setItem("access_token", data.accessToken);
            // store token in cookie
            cookies.set("access_token", data.accessToken, {expires: 1});
            localStorage.setItem("user", JSON.stringify(data.user));
            // navigate to dashboard
            notification.success({
                message: "Success",
                description: message,
                style: {zIndex: 10000000},
                placement: "bottomRight"
                
            });
            router.push("/user");
        } else {
            // show error message
            notification.error({
                message: "Error",
                description: message,
                style: {zIndex: 10000000},
                placement: "bottomRight"
            });
        }
      // router.push("/");
        // form.validateFields().then((values) => {

        //     form.resetFields();
        // }).catch((errorInfo) => {
        //     console.log(errorInfo);
        // });



    
        // e.preventDefault();
        // const email = e.target.email.value;
        // const password = e.target.password.value;
        // console.log({email, password});
    }
        
    return (
      <React.Fragment>
        <Head>
          <title>Save Lives BD</title>
          <meta name="description" content="Login page page" />
          <link rel="icon" href="/logo.png" />
        </Head>
        
        <Layout>
          <main className="pr-10 md:p-12 md:px-10 md:mx-20 min-h-[75vh] flex flex-col items-center justify-center">
            <div
              className="
                            w-full lg:w-[50%] mx-auto px-10 py-5 rounded-lg shadow-2xl
                            bg-gray-100 shadow-gray-200 
                            flex flex-col justify-center items-center my-auto
                        "
            >
              <Image src={logo} alt="logo" width={50} height={50} />
              <h1 className="text-xl font-bold text-gray-700 uppercase">
                Login
              </h1>
              <Form
                form={form}
                className="w-full flex flex-col"
                onFinish={handleSubmit}
                autoComplete="off"
                // autoCorrect="on"
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Please input your email!",
                      max: 20,
                      min: 5,
                    },
                  ]}
                >
                  <Input size="large" placeholder="email@gmail.com" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                      max: 20,
                      min: 5,
                    },
                  ]}
                >
                  <Input.Password size="large" placeholder="password" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-[100%] uppercase italic border border-blue-500 rounded bg-purple-400 hover:bg-green-500  text-white hover:text-gray-100 transition-all ease-in-out duration-300"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
              {/* <div className="text-center">
                Don't have an account?
                <span
                  // onClick={() => setLoginFlag(false)}
                  className="mx-2 italic text-indigo-500 hover:text-orange-500 transition-all ease-in-out duration-300 underline cursor-pointer"
                >
                  <Link href="/signup">Signup</Link>
                </span>
              </div> */}
            </div>
          </main>
        </Layout>
      </React.Fragment>
    );
}

export async function getServerSideProps(context: any) {
  // token from cookie
  const token = context.req.cookies.access_token;
  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {}
  };
}