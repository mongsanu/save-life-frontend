import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import logo from "../../public/logo.png";
import Link from 'next/link';
import { Form, Input, Button } from "antd";
import { useRouter } from 'next/router';

export default function login() {
    const router = useRouter();
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        console.log(values);
        router.push("/");
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

        <main className="py-12 pr-10 md:p-12 md:px-10 md:mx-20 min-h-[100vh] flex flex-col items-center justify-center">
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
            <div className="text-center">
              Don't have an account?
              <span
                // onClick={() => setLoginFlag(false)}
                className="mx-2 italic text-indigo-500 hover:text-orange-500 transition-all ease-in-out duration-300 underline cursor-pointer"
              >
                <Link href="/signup">Signup</Link>
              </span>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
}
