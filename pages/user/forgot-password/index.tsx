import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import logo from "../../../public/logo.png";
import Link from 'next/link';
import cookies from "js-cookie";
import { Form, Input, Button, notification, Row, Col } from "antd";
import { useRouter } from 'next/router';
import Layout from '../../../components/Layouts/MainLayout';
import { change_password, reset_password, user_login } from '../../../services/user.service';

export default function login() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [message, setMessage] = useState<any>("");
  const submitEmail = async (values: any) => {
    const { email } = values;
    try {
      const reset_response = await reset_password(email);
      if (reset_response?.status) {
        setEmail(email);
        setIsEmailSent(true);
        notification.success({
          message: "Success",
          description: reset_response?.message,
          style: {zIndex: 10000000},
          placement: "bottomRight"
          
      });
      } else {
        notification.error({
          message: "Error",
          description: reset_response?.message,
          style: { zIndex: 10000000 },
          placement: "bottomRight",
        });
      }
    } catch (err: any) {
      console.log({err});
      notification.error({
        message: "Error",
        description: err?.message,
        style: { zIndex: 10000000 },
        placement: "bottomRight",
      });
    }
  };

  const handleSubmit = async () => {
    // console.log(values);
    const data_obj = {
      email,
      password,
      otp
    }

    try {
      const change_res = await change_password(data_obj);
      if (change_res?.status) {
        console.log({ data_obj });
        notification.success({
          message: "Success",
          description: change_res?.message,
          style: {zIndex: 10000000},
          placement: "bottomRight"
        });
        setMessage(change_res?.message);
        form.resetFields();
        
      } else {
        notification.error({
          message: "Error",
          description: change_res?.message,
          style: { zIndex: 10000000 },
          placement: "bottomRight",
        });
      }
      
    } catch (err: any) {
      console.log({err});
      notification.error({
        message: "Error",
        description: err?.message,
        style: { zIndex: 10000000 },
        placement: "bottomRight",
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
        <main className="lg:pr-10 md:p-12 md:px-10 md:mx-20 min-h-[75vh] flex flex-col items-center justify-center">
          <div
            className="
                  w-full lg:w-[60%] mx-auto px-5 py-5 rounded-lg shadow-2xl
                  bg-gray-100 shadow-gray-200
                  flex flex-col justify-center items-center my-auto
              "
          >
            {
              !message ?
                <>
                  <Image src={logo} alt="logo" width={50} height={50} />
                  <h1 className="text-xl font-bold text-gray-700 uppercase">
                    Reset Password
                  </h1>
                  <Form
                    form={form}
                    className="w-full flex flex-col"
                    onFinish={submitEmail}
                    autoComplete="false"
                    autoSave='off'
                    // autoCorrect="on"
                    layout="vertical"
                  >
                    <Row gutter={16}>
                      <Col span={isEmailSent ? 24 : 17}>
                        <Form.Item
                          name="email"
                          label="Enter Your Email"
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
                          <Input size="large" placeholder="email@gmail.com" readOnly={isEmailSent} className={`${isEmailSent ? "bg-blue-100" : ""}`} />
                        </Form.Item>
                      </Col>
                      {
                        !isEmailSent &&
                        <Col span={7}>
                          <Form.Item label="   ">
                            <Button
                              type="primary"
                              htmlType="submit"
                              size='large'
                              className="w-[100%] uppercase italic border border-blue-500 rounded bg-purple-400 hover:bg-green-500  text-white hover:text-gray-100 transition-all ease-in-out duration-300"
                            >
                              <span className='lg:text-[1vw] text-[2.5vw]'>Send Email</span>
                            </Button>
                          </Form.Item>
                        </Col>
                      }
                    </Row>
                  </Form>
                  {
                    isEmailSent &&
                    <Form
                      form={form}
                      className="w-full flex flex-col"
                      onFinish={handleSubmit}
                      autoComplete="false"
                      autoSave='off'
                      // autoCorrect="on"
                      layout="vertical"
                    >
                      {/* OTP */}
                      <Form.Item
                        name="otp"
                        label="Otp"
                        // label={`OTP (Check your email ${email?.substring(0, 3) + "****" + email?.substring(email?.lastIndexOf("@"))}`}
                        rules={[{
                          required: true,
                          type: "string",
                          validator: (rule, value, callback) => {
                            // value check with pattern and white space
                            if (value) {
                              if (value.length != 4) {
                                callback("Otp must be 4 characters");
                              } else {
                                setOtp(value);
                              }
                            } else {
                              callback("Please enter your one time password");
                            }
                          }
                        },]}
                      >
                        <Input placeholder="Enter your one time password" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        label="New Password"
                        rules={[{
                          required: true,
                          type: "string",
                          validator: (rule, value, callback) => {
                            // value check with pattern and white space
                            if (value) {
                              if (value.length < 5) {
                                callback(
                                  "Password must be at least 5 characters"
                                );
                              } else {
                                setPassword(value);
                                callback();
                              }
                            } else {
                              callback("Please enter your password");
                            }
                          }
                        },]}
                      >
                        <Input.Password placeholder="Password" size="middle" />
                      </Form.Item>

                      <Form.Item
                        name="confirm_password"
                        label="Confirm New Password"
                        rules={[{
                          required: true,
                          type: "string",
                          validator: (rule, value, callback) => {
                            if (value) {
                              if (value !== password) {
                                callback("Password does not match");
                              } else {
                                setConfirmPassword(value);
                                callback();
                              }
                            } else {
                              callback("Please enter your confirm password");
                            }
                          }
                        },]}
                      >
                        <Input.Password placeholder="Confirm Password" size="middle" />
                      </Form.Item>

                      <Form.Item label="   ">
                        <Button
                          type="primary"
                          // htmlType="submit"
                          onClick={handleSubmit}
                          size='large'
                          className="w-[100%] uppercase italic border border-blue-500 rounded bg-purple-400 hover:bg-green-500  text-white hover:text-gray-100 transition-all ease-in-out duration-300"
                        >
                          <span className='lg:text-[1vw] text-[2.5vw]'>Change Your Password</span>
                        </Button>
                      </Form.Item>
                    </Form>
                  }
                </>
                : <h2 className='text-red-500 text-xl text-center'>{message}</h2>
            }
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
}

