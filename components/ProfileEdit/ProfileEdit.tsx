import React, { useEffect } from "react";
// import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Col,
  Row,
  DatePicker,
  notification,
  Spin,
} from "antd";
import { useRouter } from "next/router";
import { districts, divisions, unions, upazillas } from "../../configs/config";
import { admin_signup, get_user_details, update_user_details } from "../../services/user.service";
import dayjs from "dayjs";
const { TextArea } = Input;
const { Option } = Select;

const blood_groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const user_roles = [
    // { id: 1, name: "super-admin" },
    { id: 2, name: "admin" },
    { id: 3, name: "donor" },
]

export default function ProfileEdit({token, callback}: any) {
    // navigate to other pages
    const router = useRouter();
    const [form] = Form.useForm();
    const [name, setName] = React.useState("");
    const [avatar, setAvatar] = React.useState("");
    const [bloodGroup, setBloodGroup] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [facebookUrl, setFacebookUrl] = React.useState("");
    const [lastDonationDate, setLastDonationDate] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [division, setDivision] = React.useState("");
    const [district, setDistrict] = React.useState("");
    const [upazilla, setUpazila] = React.useState("");
    const [union, setUnion] = React.useState("");
    const [user, setUser] = React.useState<any>(null);
    const getUser = async () => {
        const {data: user, status}: any = await get_user_details(token);
        if (status) {
            console.log({ user });
            setUser(user);
            setName(user?.user_name);
            setAvatar(user?.avatar);
            setBloodGroup(user?.blood_group);
            setPhone(user?.phone);
            setAddress(user?.address);
            setDivision(user?.division);
            setDistrict(user?.district);
            setUpazila(user?.upazilla);
            setUnion(user?.union);
            setFacebookUrl(user?.facebook_url);
            setLastDonationDate(user?.last_donation_date);
            setEmail(user?.email);
        }
    }
    useEffect(() => {
        getUser();
    }, [""]);
    const handleSubmit = async (values: any) => {
        console.log({ values });
        // const division = divisions.find((division: any) => division.id === values.division);
        // const district = districts.find((district: any) => district.id === values.district);
        // const upazilla = upazillas.find((upazilla: any) => upazilla.id === values.upazilla);
        // const union = unions.find((union: any) => union.id === values?.union);
        const body = {
            ...values,
            // division: division?.name,
            // district: district?.name,
            // upazilla: upazilla?.name,
            // union: union?.name,
            avatar: avatar || user?.avatar,
            address: values?.address || address,
            lastDonationDate: values?.lastDonationDate || lastDonationDate,
            facebook_url: values?.facebook_url || "https://www.facebook.com/mongsanu.marma.33",
        };
        console.log({ body });
        const result = await update_user_details(body);
        console.log({ result });
        if (result.status) {
            notification.success({
                message: "Success",
                description: result.message,
                style: { zIndex: 10000000 },
                placement: "bottomRight",
            });
            
            form.resetFields();
            // setUser(null);
            getUser();
            callback(false);
            // router.push("/admin");
        } else {
            notification.error({
                message: "Error",
                description: result.message,
                style: { zIndex: 10000000 },
                placement: "bottomRight",
            });
        }
        // router.push("/admin");
    };
    
    const [filteredDistricts, setFilteredDistricts] = React.useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = React.useState([]);
    const [filteredUnions, setFilteredUnions] = React.useState([]);

    React.useEffect(() => {
        if (division) {
            const filteredDistricts = districts.filter(
                (district: any) => district.division_id === division
            );
            setDistrict("");
            setUpazila("");
            setUnion("");
            setFilteredDistricts(filteredDistricts);
        }
    }, [division]);

    React.useEffect(() => {
        if (district) {
            const filteredUpazilas = upazillas.filter(
                (upazilla: any) => upazilla.district_id === district
            );
            setUpazila("");
            setUnion("");
            setFilteredUpazilas(filteredUpazilas);
        }
    }, [district]);

    React.useEffect(() => {
        console.log({ upazilla });
        
        if (upazilla) {
            const filteredUnions = unions.filter(
                (union: any) => union.upazilla_id === upazilla
            );
            
            setUnion("");
            setFilteredUnions(filteredUnions);
        }
    }, [upazilla]);

  return (
    <React.Fragment>
        <main>
          <div className={`w-full lg:w-[${"70%"}] mx-auto rounded-lg flex flex-col justify-center items-center`}>
            {/* <Image src={"/logo.png"} alt="logo" width={20} height={20} /> */}
            {
                user && email
                ? <Form
                        form={form}
                        className="w-full flex flex-col"
                        onFinish={handleSubmit}
                        autoComplete="off"
                        autoSave="off"
                        // autoCorrect="on"
                        layout="vertical"
                        initialValues={{
                            user_name: name,
                            blood_group: bloodGroup,
                            phone: phone,
                            avatar: avatar,
                            address: address,
                            email: email,
                            division: user?.division,
                            district: user?.district,
                            upazilla: user?.upazilla,
                            union: user?.union,
                            facebook_url: facebookUrl,
                            lastDonationDate: lastDonationDate ? dayjs(lastDonationDate, "YYYY-MM-DD") : null,
                            // lastDonationDate: user?.last_donation_date
                            //                   ? dayjs(user?.last_donation_date, "YYYY-MM-DD")
                            //                   : null,
                        }}
                    >

                        <Row gutter={16}>
                            <Col span={24} lg={24} xs={24}>
                                {/* Name */}
                                <Form.Item
                                    name="user_name"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            validator: (rule, value, callback) => {
                                            if (value) {
                                                if (value.length > 20) {
                                                    callback("Name must be less than 20 characters");
                                                } else if (value.length < 5) {
                                                    callback("Name must be greater than 5 characters");
                                                } else {
                                                    callback();
                                                    setName(value);
                                                }
                                            } else {
                                                callback("Please enter your name");
                                            }
                                            },
                                        },
                                    ]}
                                >
                                    <Input placeholder="Name" size="middle" />
                                </Form.Item>
                            </Col>
                            <Col span={8} lg={12} xs={24}>
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
                                            callback("Please enter your email");
                                        }
                                        },
                                        // validateTrigger: "onBlur",
                                    },
                                    ]}
                                >
                                    <Input readOnly={true} value={email} placeholder="Email" size="middle" autoComplete="off" autoSave="off" />
                                </Form.Item>
                            </Col>
                                        
                            <Col span={8} lg={12} xs={24}>
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
                                        size="middle"
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
                            <Col span={8} lg={12} xs={24}>
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
                                            callback("Please enter your phone number");
                                        }
                                        },
                                        // validateTrigger: "onBlur",
                                    },
                                    ]}
                                >
                                    <Input value={phone} placeholder="Phone" size="middle" />
                                </Form.Item>
                            </Col>
                            <Col span={8} lg={12} xs={24}>
                                {/* Last Donation Date */}
                                <Form.Item
                                    name="last_donation_date"
                                    label="Last Donation Date"
                                    initialValue={
                                        lastDonationDate
                                        ? dayjs(lastDonationDate, "YYYY-MM-DD")
                                        : null
                                    }
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
                                        // value={lastDonationDate ? dayjs(lastDonationDate) : null}
                                        onChange={(date, dateString) =>
                                            setLastDonationDate(dateString)
                                        }
                                        placeholder="Select Last Donation Date"
                                        size="middle"
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                name="facebook_url"
                                label="Facebook URL"
                                rules={[
                                    {
                                    required: false,
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
                                    <Input placeholder="Facebook URL" size="middle" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                {/* avatar url by text area */}
                                <Form.Item
                                    name="avatar"
                                    className="relative"
                                    initialValue={avatar || ""}
                                    label="Avatar"
                                    rules={[
                                        {
                                            required: false,
                                            type: "string",
                                            validator: (rule, value, callback) => {
                                                // value check with pattern and white space
                                                const pattern =
                                                    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9@:%._\+~#?&//=]*)\.(?:jpg|jpeg|png|gif|svg)$/;
                                                if (value) {
                                                    if (value.length > 100) {
                                                        callback(
                                                            "Avatar URL must be less than 100 characters"
                                                        );
                                                    } else if (!pattern.test(value)) {
                                                        callback("Invalid Avatar URL");
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
                                        placeholder="Avatar URL"
                                        value={avatar}
                                        className="pr-12"
                                        onChange={(e) => setAvatar(e.target.value)}
                                        autoSize={{ minRows: 2, maxRows: 5 }}
                                        allowClear
                                    />
                                    <img
                                         className="
                                            object-cover rounded-full border-2 border-indigo-500
                                            absolute top-1 right-2 z-50
                                        " 
                                        style={{width: '2.8rem', height: '2.8rem'}}
                                        src={user?.avatar || "https://i.ibb.co/qDtQqH8/teacher-avatar.png"}
                                        alt="avatar"
                                    />    
                                    
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        {/* <Row gutter={16}>
                            <Col span={12} lg={12} xs={24}>
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
                                            setUpazila("");
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
                                        setUpazila("");
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
                                <Form.Item
                                    name="upazilla"
                                    label="Upazila"
                                    rules={[
                                    {
                                        required: true,
                                        type: "string",
                                        message: "Please select your upazilla",
                                    },
                                    ]}
                                >
                                    <Select
                                    placeholder="Select Upazila"
                                    className="w-full"
                                    value={upazilla || "Select Upazila"}
                                    disabled={!district || !division || !bloodGroup}
                                    onChange={(value) => {
                                        setUpazila(value);
                                    }}
                                    showSearch
                                    allowClear
                                    filterOption={(input: any, option: any) =>
                                        option?.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                    }
                                    >
                                    {filteredUpazilas?.map((upazilla: any) => (
                                        <Option key={upazilla?.id} value={upazilla?.id}>
                                        {upazilla?.name}
                                        </Option>
                                    ))}
                                    </Select>
                                </Form.Item>
                                </Col>

                            <Col span={12} lg={12} xs={24}>
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
                        </Row> */}
                        <Form.Item>
                            <Button
                                type="primary"
                                danger
                                htmlType="submit"
                                className="w-[100%] uppercase italic border border-blue-500 rounded transition-all ease-in-out duration-300"
                            >
                                Update Profile
                            </Button>
                        </Form.Item>
                    </Form>
                : <Spin className="my-5" size="small" />
            }
            
          </div>
        </main>
    </React.Fragment>
  );
}
