import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Form, Input, Button, Checkbox, Select, Col, Row, DatePicker, notification } from "antd";
import { useRouter } from "next/router";
import Layout from "../../components/Layouts/MainLayout";
import { districts, divisions, unions, upazillas } from "../../configs/config";
import { donor_register } from "../../services/user.service";
const { TextArea } = Input;
const { Option } = Select;

const blood_groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Register() {
    // navigate to other pages
    const router = useRouter();
    const [form] = Form.useForm();
    const [name, setName] = React.useState("");
    const [bloodGroup, setBloodGroup] = React.useState("");
    const [medicalName, setMedicalName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [age, setAge] = React.useState();
    const [email, setEmail] = React.useState("");  
    const [division, setDivision] = React.useState("");
    const [district, setDistrict] = React.useState("");
    const [upazilla, setUpazilla] = React.useState("");
    const [union, setUnion] = React.useState("");
    const [lastDonationDate, setLastDonationDate] = React.useState("");
    const [filteredDistricts, setFilteredDistricts] = React.useState([]);
    const [filteredUpazillas, setFilteredUpazillas] = React.useState([]);
    const [filteredUnions, setFilteredUnions] = React.useState([]);
    const handleSubmit = async (values: any) => {
        console.log({ values });
        const body = {
          ...values,
          phone: phone || values?.phone,
          last_donation_date: lastDonationDate || values?.last_donation_date,

        }
        const result = await donor_register(body);
        const { data, status, message } = result;
        if (status) {
          notification.success({
            message: "Success",
            description: message,
            style: { zIndex: 10000000 },
            placement: "bottomRight",
          });
          form.resetFields();
          router.push("/");
        } else {
          notification.error({
            message: "Error",
            description: message,
            style: { zIndex: 10000000 },
            placement: "bottomRight",
          });
        }
          
    };

    React.useEffect(() => {
      if (division) {
        const filteredDistricts = districts.filter(
          (district: any) => district.division_id === division
        );
        setFilteredDistricts(filteredDistricts);
      }
    }, [division]);

    React.useEffect(() => {
      if (district) {
        const filteredUpazillas = upazillas.filter(
          (upazilla: any) => upazilla.district_id === district
        );
        setFilteredUpazillas(filteredUpazillas);
      }
    }, [district]);

    React.useEffect(() => {
      if (upazilla) {
        const filteredUnions = unions.filter(
          (union: any) => union.upazilla_id === upazilla
        );
        setFilteredUnions(filteredUnions);
      }
    }, [upazilla]);

    return (
      <React.Fragment>
        <Head>
          <title>Save Lives BD</title>
          <meta name="description" content="Registration page" />
          <link rel="icon" href="/logo.png" />
        </Head>
        <Layout>
          <main className="py-5 md:px-10 md:mx-20 flex flex-col items-center justify-center">
            <div className="w-full lg:w-[70%] mx-auto px-10 pt-5 rounded-lg lg:shadow-2xl lg:bg-gray-100 flex flex-col justify-center items-center">
              <Image src={"/logo.png"} alt="logo" width={50} height={50} />
              <h1 className="text-xl font-bold text-gray-700 uppercase">
                Donor Registration
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
                  name="user_name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name",
                      validator: (rule, value, callback) => {
                        if (value) {
                          if (value.length > 20) {
                            callback("Name must be less than 20 characters");
                          } else if (value.length < 3) {
                            callback("Name must be greater than 3 characters");
                          } else {
                            callback();
                          }
                        } else {
                          callback();
                        }
                      },
                    },
                  ]}
                >
                  <Input placeholder="Name" size="large" />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={8} lg={8} xs={24}>
                    {/* Blood Group */}
                    <Form.Item
                      name="blood_group"
                      label="Blood Group"
                      rules={[
                        {
                          required: true,
                          type: "string",
                          message: "Please select your blood group",
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
                  <Col span={8} lg={8} xs={24}>
                    {/* Phone */}
                    <Form.Item
                      name="phone"
                      label="Phone"
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
                              setPhone(value);
                              callback();
                            }
                          },
                          // validateTrigger: "onBlur",
                        },
                      ]}
                    >
                      <Input value={phone} placeholder="Phone" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={8} lg={8} xs={24}>
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
                                callback(
                                  "Email must be less than 50 characters"
                                );
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
                {/* Facebook URL */}
                <Form.Item
                  name="facebook_url"
                  label="Facebook URL"
                  rules={[
                    {
                      required: true,
                      type: "string",
                      validator: (rule, value, callback) => {
                        // value check with pattern and white space
                        const pattern =
                          /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
                        if (value) {
                          if (value.length > 100) {
                            callback(
                              "Facebook URL must be less than 100 characters"
                            );
                          } else if (!pattern.test(value)) {
                            callback("Invalid Facebook URL");
                          } else {
                            callback();
                          }
                        } else {
                          callback();
                        }
                      },
                    },
                  ]}
                >
                  <Input placeholder="Facebook URL" size="large" />
                </Form.Item>
                {/* Last Donation Date */}
                <Row gutter={16}>
                  <Col span={12} lg={12} xs={24}>
                  <Form.Item
                      name="age"
                      label="Age"
                      required
                      rules={[
                        {
                          required: true,
                          type: "number",
                          validator: (rule, value, callback) => {
                            if (value) {
                              
                              callback();
                              setAge(value);
                            } else {
                              callback("Age is required");
                            }
                          }
                        },
                      ]}
                    >
                      <Input type="number" style={{width: '100%'}} placeholder="age" size="large" value={age} />
                    </Form.Item>
                  </Col>
                  <Col span={12} lg={12} xs={24}>
                    <Form.Item
                      name="last_donation_date"
                      label="Last Donation Date"
                      rules={[
                        {
                          required: false,
                          type: "date",
                          message: "Please select your last donation date",
                        },
                      ]}
                    >
                      <DatePicker
                        className="w-full"
                        onChange={(date, dateString) =>
                          setLastDonationDate(dateString)
                        }
                        placeholder="Select Last Donation Date"
                        size="large"
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} lg={12} xs={24}>
                    {/* Division */}
                    <Form.Item
                      name="division"
                      label="Division"
                      rules={[
                        {
                          required: true,
                          type: "string",
                          message: "Please select your division",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select Division"
                        className="w-full"
                        value={division || "Select Division"}
                        disabled={!bloodGroup}
                        onChange={(value) => {
                          setDivision(value);
                          setDistrict("");
                          setUpazilla("");
                        }}
                        allowClear
                        showSearch
                        filterOption={(input: any, option: any) =>
                          option?.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {divisions?.map((division: any) => (
                          <Option key={division?.id} value={division?.id}>
                            {division?.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12} lg={12} xs={24}>
                    {/* District */}
                    <Form.Item
                      name="district"
                      label="District"
                      rules={[
                        {
                          required: true,
                          type: "string",
                          message: "Please select your district",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select District"
                        className="w-full"
                        value={district || "Select District"}
                        disabled={!division || !bloodGroup}
                        onChange={(value) => {
                          setDistrict(value);
                          setUpazilla("");
                        }}
                        showSearch
                        allowClear
                        filterOption={(input: any, option: any) =>
                          option?.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {filteredDistricts?.map((district: any) => (
                          <Option key={district?.id} value={district?.id}>
                            {district?.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12} lg={12} xs={24}>
                    {/* Upazilla */}
                    <Form.Item
                      name="upazilla"
                      label="Upazilla"
                      rules={[
                        {
                          required: true,
                          type: "string",
                          message: "Please select your upazilla",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select Upazilla"
                        className="w-full"
                        value={upazilla || "Select Upazilla"}
                        disabled={!district || !division || !bloodGroup}
                        onChange={(value) => {
                          setUpazilla(value);
                        }}
                        showSearch
                        allowClear
                        filterOption={(input: any, option: any) =>
                          option?.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {filteredUpazillas?.map((upazilla: any) => (
                          <Option key={upazilla?.id} value={upazilla?.id}>
                            {upazilla?.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12} lg={12} xs={24}>
                    {/* Union */}
                    <Form.Item
                      name="union"
                      label="Union"
                      required={false}
                      rules={[
                        {
                          required: false,
                          type: "string",
                          message: "Please select your union",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select Union"
                        className="w-full"
                        value={union || "Select Union"}
                        disabled={
                          !upazilla || !district || !division || !bloodGroup
                        }
                        onChange={(value) => {
                          setUnion(value);
                        }}
                        showSearch
                        allowClear
                        filterOption={(input: any, option: any) =>
                          option?.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {filteredUnions?.map((union: any) => (
                          <Option key={union?.id} value={union?.id}>
                            {union?.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                {/* <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      type: "string",
                      // validation error 50 characters
                      validator: (rule, value, callback) => {
                        if (value) {
                          if (value.length > 50) {
                            callback("Address be less than 50 characters");
                          } else {
                            callback();
                          }
                        } else {
                          callback();
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
                </Form.Item> */}
                <Form.Item>
                  <Button
                    // type="primary"
                    htmlType="submit"
                    className="w-[100%] uppercase italic border border-blue-500 rounded hover:bg-white bg-red-400  text-white hover:text-gray-100 transition-all ease-in-out duration-300"
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </main>
        </Layout>
      </React.Fragment>
    );
}
