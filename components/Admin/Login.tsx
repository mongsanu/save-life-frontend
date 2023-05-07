import React from "react";
import cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import {
  Form,
  Input,
  Button,
  notification,

} from "antd";
import { useRouter } from "next/router";
import Layout from "../../components/Layouts/MainLayout";
import { admin_login } from "../../services/user.service";

export default function Login() {
    // navigate to other pages
    const router = useRouter();
    const [form] = Form.useForm();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleSubmit = async(values: any) => {
        console.log({ values });
        const data_obj = {
            ...values,
            role_id: 2,
            user_role: "admin",
        }
        const login_result = await admin_login(data_obj);
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
            router.push("/admin");
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
    };


    return (
        <React.Fragment>
            <main className="py-[40px] md:px-10 md:mx-20 flex flex-col items-center justify-center">
                <div className="w-full lg:w-[40%] mx-auto px-10 pt-5 rounded-lg lg:shadow-2xl lg:bg-gray-100 flex flex-col justify-center items-center">
                    <Image src={"/logo.png"} alt="logo" width={50} height={50} />
                    <h1 className="text-xl font-bold text-gray-700 uppercase">
                    Admin Login
                    </h1>
                    <Form
                    form={form}
                    className="w-full flex flex-col"
                    onFinish={handleSubmit}
                    autoComplete="off"
                    // autoCorrect="on"
                    layout="vertical"
                    >
                        {/* Email */}
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                            {
                                required: true,
                                type: "email",
                                // pattern: /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/,
                                // message: 'Invalid email',
                                validator: (rule, value, callback) => {
                                // value check with pattern
                                const pattern =
                                    /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
                                if (value) {
                                    if (value.length > 50) {
                                        callback("Email must be less than 50 characters");
                                    } else if (!pattern.test(value)) {
                                        callback("Invalid email");
                                    } else {
                                        setEmail(value);
                                        callback();
                                    }
                                } else {
                                    callback("Email is required");
                                }
                                },
                                // validateTrigger: "onBlur",
                            },
                            ]}
                        >
                            <Input value={email} placeholder="Email" size="large" />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    validator: (rule, value, callback) => {
                                        if (value) {
                                            if (value.length < 5) {
                                                callback("Password must be at least 5 characters");
                                            } else {
                                                setPassword(value);
                                                callback();
                                            }
                                        } else {
                                            callback("Password is required");
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input.Password
                                value={password}
                                placeholder="Password"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                // type="primary"
                                type="primary"
                                danger
                                htmlType="submit"
                                className="w-[100%] uppercase italic border border-blue-500 rounded  transition-all ease-in-out duration-300"
                            >
                                Login
                            </Button>
                        </Form.Item>
                        <p className="text-center py-5">
                            Don't have an account?{" "}
                            <Link href="/admin/signup">
                                <a className="text-blue-500">Register</a>
                            </Link>
                        </p>
                    </Form>
                </div>
            </main>
        </React.Fragment>
    );
}
