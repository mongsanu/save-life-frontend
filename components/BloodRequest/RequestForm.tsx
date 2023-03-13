import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Form, Input, Button, Checkbox, Select, Row, Col, InputNumber, notification } from "antd";
import { useRouter } from "next/router";
import { create_blood_request } from "../../services/blod.request.service";
const { TextArea } = Input;
const { Option } = Select;

const blood_groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];


export default function RequestForm() {
    // navigate to other pages
    const router = useRouter();
    const [form] = Form.useForm();
    const handleSubmit = (values: any) => {
        console.log({ values });
        // validate values
        form.validateFields().then(async(values) => {
            console.log({ values });
            const body = {
              ...values,
            }
            const result = await create_blood_request(body);
            if(result.status) {
                notification.success({
                    message: "Success",
                    description: result.message,
                    placement: "bottomRight",
                    duration: 2
                });
                form.resetFields();
                router.push("/");
            } else {
                notification.error({
                    message: "Error",
                    description: result.message,
                    placement: "bottomRight",
                    duration: 2
                });
              }
              
        }).catch((error) => {
            console.log({ error });
            notification.error({
              message: "Error",
              description: error?.message || "Something went wrong",
              placement: "bottomRight",
              duration: 2,
            });
        });
    };

    const [name, setName] = React.useState("");
    const [bloodGroup, setBloodGroup] = React.useState("");
    const [medicalName, setMedicalName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [cause, setCause] = React.useState("");
    const [bloodQuantity, setBloodQuantity] = React.useState(0);

    return (
      <React.Fragment>
        <main className="min-h-full flex flex-col items-center justify-center shadow-2xl bg-gray-100 rounded-lg pt-2 px-5">
          <Image
            className="animation-top-bounce"
            src={"/logo.png"}
            alt="logo"
            width={50}
            height={50}
          />
          <h1 className="text-md font-semibold text-gray-700 uppercase">
            Make Blood Request
          </h1>
          <Form
            form={form}
            className="w-full flex flex-col"
            onFinish={handleSubmit}
            autoComplete="off"
            // autoCorrect="on"
            layout="vertical"
          >
            {/* Name */}
            <Form.Item
              name="patient_name"
              label="Name"
              required
              rules={[
                {
                  required: true,
                  type: "string",
                  // validation error 50 characters
                  validator: (rule, value, callback) => {
                    if (value) {
                      if (value.length > 20) {
                        callback("Name must be less than 20 characters");
                      } else {
                        setName(value);
                        callback();
                      }
                    } else {
                      // setName(value);
                      callback("Name is required");
                    }
                  },
                },
              ]}
            >
              <Input value={name} placeholder="Name" size="large" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={8} xs={24} lg={12}>
                {/* Blood quantity */}
                <Form.Item
                  name="blood_quantity"
                  label="Blood Quantity"
                  required
                  rules={[
                    {
                      required: true,
                      type: "number",
                      validator: (rule, value, callback) => {
                        if (value) {
                          if (value > 10) {
                            callback("Blood quantity must be less than 10 bags");
                            setBloodQuantity(bloodQuantity);
                          } else {
                            callback();
                            setBloodQuantity(value);
                          }
                        } else {
                          callback("Blood quantity is required");
                        }
                      }
                    },
                  ]}
                >
                  <Input type="number" style={{width: '100%'}} placeholder="Blood Quantity" size="large" value={bloodQuantity} />
                </Form.Item>
              </Col>
              <Col span={8} xs={24} lg={12}>
                {/* Cause for cause */}
                <Form.Item
                  name="cause"
                  label="Cause"
                  required
                  rules={[
                    {
                      required: true,
                      type: "string",
                      validator: (rule, value, callback) => {
                        // validate for the number 
                        const regex = /^[0-9]+$/;
                        if (value) {
                          if (value.length > 50) {
                            callback("Cause must be less than 50 characters");
                          } else if (regex.test(value)) {
                            callback("Cause must be a string");
                          } else {
                            callback();
                            setCause(value);
                          }
                        } else {
                          callback("Cause is required");
                        }
                      },
                    },
                  ]}
                >
                  <Input  placeholder="Cause" size="large" value={cause} />
                </Form.Item>
              </Col>
            </Row>


            <Row gutter={16}>
              <Col span={8} xs={24} lg={8}>
                {/* Blood Group */}
                <Form.Item
                  name="blood_group"
                  label="Blood Group"
                  required
                  rules={[
                    {
                      required: true,
                      type: "string",
                      message: "Please select blood group",
                    },
                  ]}
                >
                  <Select
                    onChange={(value) => setBloodGroup(value)}
                    placeholder="Select Blood Group"
                    size="large"
                    allowClear
                    showSearch
                    showAction={["focus"]}
                  >
                    {blood_groups.map((blood_group) => (
                      <Option key={blood_group} value={blood_group}>
                        {blood_group}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} xs={24} lg={8}>
                {/* Phone */}
                <Form.Item
                  name="phone"
                  label="Phone"
                  required
                  rules={[
                    {
                      required: true,
                      type: "string",
                      validator: (rule, value, callback) => {
                        // value check with pattern
                        const pattern = /^[0-9]*$/;
                        if (value) {
                          if (value.length !== 11) {
                            callback("Phone number must 11 characters");
                          } else if (!pattern.test(value)) {
                            callback("Invalid phone number");
                          } else {
                            setPhone(value);
                            callback();
                          }
                        } else {
                          callback("Phone number is required");
                        }
                      },
                      // validateTrigger: "onBlur",
                    },
                  ]}
                >
                  <Input value={phone} placeholder="Phone" size="large" />
                </Form.Item>
              </Col>
              <Col span={8} xs={24} lg={8}>
                {/* Email */}
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: false,
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
                          setEmail(value);
                          callback();
                        }
                      },
                      // validateTrigger: "onBlur",
                    },
                  ]}
                >
                  <Input value={email} placeholder="Email" size="large" />
                </Form.Item>
              </Col>
            </Row>
            {name && bloodGroup && phone ? (
              <Row gutter={16}>
                <Col span={12} xs={24}>
                  {/* Medical Name */}
                  <Form.Item
                    name="medical_name"
                    label="Medical Name"
                    required
                    rules={[
                      {
                        required: true,
                        type: "string",
                        // validation error 50 characters
                        validator: (rule, value, callback) => {
                          if (value) {
                            if (value.length > 50) {
                              callback(
                                "Medical name must be less than 50 characters"
                              );
                              // setMedicalName(value);
                            } else {
                              setMedicalName(value);
                              callback();
                            }
                          } else {
                            callback("Medical name is required");
                          }
                        },
                      },
                    ]}
                  >
                    <Input
                      value={medicalName}
                      placeholder="Medical Name"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={12} xs={24}>
                  {/* Address */}
                  <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                      {
                        required: true,
                        type: "string",
                        // validation error 50 characters
                        validator: (rule, value, callback) => {
                          if (value) {
                            if (value.length > 100) {
                              callback("Address be less than 100 characters");
                            } else {
                              callback();
                              setAddress(value);
                            }
                          } else {
                            callback("Address is required");
                          }
                        },
                      },
                    ]}
                  >
                    <TextArea
                      rows={3}
                      placeholder="Address"
                      style={{ resize: "none" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} xs={24}>
                  {/* Message */}
                  <Form.Item
                    name="message"
                    label="Message"
                    rules={[
                      {
                        required: false,
                        type: "string",
                        // validation error 50 characters
                        validator: (rule, value, callback) => {
                          if (value) {
                            if (value.length > 500) {
                              callback(
                                "Message must be less than 500 characters"
                              );
                            } else {
                              callback();
                            }
                          } else {
                            callback("Message is required");
                          }
                        },
                      },
                    ]}
                  >
                    <TextArea
                      rows={3}
                      placeholder="Message"
                      style={{ resize: "none" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            ) : null}

            <Form.Item>
              <Button
                // type="dashed"
                htmlType="submit"
                // ghost={true}
                type="primary"
                danger={true}
                className="w-[100%] transition-all ease-in-out duration-300 mt-3"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </main>
      </React.Fragment>
    );
}
