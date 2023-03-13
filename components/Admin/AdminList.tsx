import { Button, Card, Modal, notification, Popconfirm, Table, Tooltip } from "antd";
import { MessageOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router';
import React from 'react';
import { request_data } from './dummy_requests';
import Cookies from "js-cookie";
import { districts, divisions, unions, upazillas } from "../../configs/config";
import { find_admins, send_email_to_admin, user_delete } from "../../services/user.service";
import SendMessage from "../Donors/SendMessage";
import Signup from "./Signup";

export default function AdminList() {
    const navigate = useRouter();
    const [data, setData] = React.useState([]);
    const [columns, setColumns] = React.useState([]);

    const [bloodGroup, setBloodGroup] = React.useState("");
    const [division, setDivision] = React.useState("");
    const [district, setDistrict] = React.useState("");
    const [upazilla, setUpazilla] = React.useState("");
    const [union, setUnion] = React.useState("");
    const [filteredData, setFilteredData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [userData, setUserData] = React.useState({});
    const [sendMessageUser, setSendMessageUser] = React.useState<any>(null);
    const token = Cookies.get("access_token");
    React.useEffect(() => {
      // console.log({divisions, districts, upazilas, unions});
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      const columns: any = [
        {
          title: "Name",
          dataIndex: "user_name",
          key: "user_name",
          fontSize: 5,
        },
        {
          title: "Blood Group",
          dataIndex: "blood_group",
          key: "blood_group",
          align: "center",
        },
        
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
          align: "center",
          render: (text: any, record: any) => (
            <span className="text-[12px]">{text}</span>
          ),
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          align: "center",
          width: "20%",
        },
        {
          title: "Division",
          dataIndex: "division",
          key: "division",
          align: "center",
          render: (text: any, record: any) =>
            divisions.find((division: any) => division.id === text)?.name,
        },
        {
          title: "District",
          dataIndex: "district",
          key: "district",
          align: "center",
          render: (text: any, record: any) =>
            districts.find((district: any) => district.id === text)?.name,
        },
        {
          title: "Upazilla",
          dataIndex: "upazilla",
          key: "upazilla",
          align: "center",
          render: (text: any, record: any) =>
            upazillas.find((upazilla: any) => upazilla.id === text)?.name,
        },
        {
          title: "Union",
          dataIndex: "union",
          key: "union",
          align: "center",
          render: (text: any, record: any) =>
            unions.find((union: any) => union.id === text)?.name,
        },
        {
          title: "FB Profile",
          dataIndex: "facebook_url",
          key: "facebook_url",
          align: "center",
          render: (text: any, record: any) => (
            <a
              className="text-center w-[20px] h-[20px] m-auto flex justify-center items-center"
              href={text}
              target="_blank"
            >
              <img
                height={20}
                width={20}
                className="hover:scale-110 transform transition-all duration-300"
                src={"https://img.icons8.com/color/48/000000/facebook-new.png"}
                alt="facebook"
              />
            </a>
          ),
        },
      ];
      if (token) {
        columns.push(...[
          {
            title: "Status",
            dataIndex: "isVerified",
            key: "isVerified",
            align: "center",
            render: (text: any, record: any) => (
              <div>
                {text ? (
                  <span className="text-[#0d00ff]">Verified</span>
                ) : (
                  <span className="text-[#ff0000]">Not Verified</span>
                )}
              </div>
            ),
          },
          {
            title: "Action",
            dataIndex: "email",
            key: "email",
            align: "center",
            render: (text: any, record: any) => (
              <div className="flex gap-2 justify-center items-center">
                <span
                  onClick={() => {
                    setSendMessageUser(record);
                  }}
                >
                  <MessageOutlined className="cursor-pointer text-[#00ffae] hover:text-[#ff9d00] hover:scale-110 transform transition-all duration-300" />
                </span>
                <Popconfirm
                  title="Delete Record"
                  description="Are you sure to remove this request?"
                  onConfirm={() =>
                    confirm().then(async() => {
                      console.log("deleted");
                      const delete_result = await user_delete(record.email);
                      if(delete_result.status) {
                        notification.success({
                          message: "Success",
                          description: delete_result.message,
                          placement: "bottomRight",
                        });
                        getAdmins();
                      } else {
                        notification.error({
                          message: "Error",
                          description: "Something went wrong",
                          placement: "bottomRight",
                        });
                      }
                    })
                  }
                  onOpenChange={() => console.log("open change")}
                  okButtonProps={{
                    danger: true,
                    size: "small",
                  }}
                >
                  <DeleteOutlined className="cursor-pointer text-[magenta] hover:text-[#ff00ff] hover:scale-110 transform transition-all duration-300" />
                </Popconfirm>
              </div>
            ),
          }
        ]);
      } else {
        columns.push(...[
          {
            title: "Action",
            dataIndex: "email",
            key: "email",
            align: "center",
            render: (text: any, record: any) => (
              <div className="flex gap-2 justify-center">
                <span
                  onClick={() => {
                    setSendMessageUser(record);
                  }}
                >
                  <MessageOutlined className="cursor-pointer text-[#00ffae] hover:text-[#ff9d00] hover:scale-110 transform transition-all duration-300" />
                </span>
              </div>
            ),
          }
        ]);
      }

      // const data = Admins_data;
      setColumns(columns);
      if (!data?.length) {
        getAdmins();
      }
    }, [""]);

    
    const getAdmins = async () => {
      const auth_user = JSON.parse(localStorage?.getItem("user") || "{}");
      const result = await find_admins();
      if (result?.status) {
        let data = result?.data?.filter((admin: any) => admin.email !== auth_user.email);
        setData(data);
        if (bloodGroup) {
          data = data.filter((item: any) => item.blood_group === bloodGroup);
          if (division) {
            data = data.filter((item: any) => item.division === division);
            if (district) {
              data = data.filter((item: any) => item.district === district);
              if (upazilla) {
                data = data.filter((item: any) => item.upazilla === upazilla);
                if (union) {
                  data = data.filter((item: any) => item.union === union);
                } else {
                  setFilteredData(data);
                }
              } else {
                setFilteredData(data);
              }
            } else {
              setFilteredData(data);
            }
          } else {
            setFilteredData(data);
          }
        } else {
          setFilteredData(data);
        }
      } else {
        setFilteredData([]);
      }
    };

    const [filteredDistricts, setFilteredDistricts] = React.useState([]);
    const [filteredUpazillas, setFilteredUpazillas] = React.useState([]);
    const [filteredUnions, setFilteredUnions] = React.useState([]);

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
          (union: any) => union.upazila_id === upazilla
        );
        setFilteredUnions(filteredUnions);
      }
    }, [upazilla]);

    const handleShowModal = () => {
      setSendMessageUser(null);
    };

    const handleFilter = () => {
      if (bloodGroup) {
        let filteredData = data.filter(
          (item: any) => item.blood_group === bloodGroup
        );
        if (division) {
          filteredData = filteredData.filter(
            (item: any) => item.division === division
          );
          if (district) {
            filteredData = filteredData.filter(
              (item: any) => item.district === district
            );
            if (upazilla) {
              filteredData = filteredData.filter(
                (item: any) => item.upazilla === upazilla
              );
              if (union) {
                filteredData = filteredData.filter(
                  (item: any) => item.union === union
                );
              } else {
                setFilteredData(filteredData);
              }
            } else {
              setFilteredData(filteredData);
            }
          } else {
            setFilteredData(filteredData);
          }
        } else {
          setFilteredData(filteredData);
        }
      } else {
        getAdmins();
      }
    };

    const confirm = () => new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    });

    const [isAdminModalShow, setIsAdminModalShow] = React.useState(false);

    return (
      <React.Fragment>
        <SendMessage
          isOpen={sendMessageUser ? true : false}
          user={sendMessageUser}
          handleShowModal={handleShowModal}
          title="Send Message To Admin"
          send_email={send_email_to_admin}
        />

        <Modal
          title="Add Admin"
          open={isAdminModalShow ? true : false}
          onCancel={() => setIsAdminModalShow(!isAdminModalShow)}
          footer={null}
        >
          <Signup from="admin" />
        </Modal>
        <div className="bg-yellow-100 min-h-[50vh] w-full px-8 py-5">
          <div className="flex flex-col gap-2 justify-center items-center">
            <p className="text-4xl font-bold text-red-500">Admin List</p>
            <p className="text-xl text-center">
              Blood donation costs nothing but it can save everything!
            </p>
            <Card
              bordered={true}
              extra={
                token
                ? <Button
                    type="primary"
                    danger
                    onClick={() => setIsAdminModalShow(!isAdminModalShow)}
                  >
                    Add Admin
                  </Button>
                : null
              }
            >
              <Table
                columns={columns}
                dataSource={data}
                rowKey={(record: any) => record?._id}
                size="small"
                style={{ width: "100%" }}
                scroll={{
                  x: 280,
                  y: 320,
                }}
                pagination={{
                  total: data.length,
                  pageSize: 5,
                  //   showSizeChanger: true,
                  //   pageSizeOptions: ["5", "10", "20"],
                  position: ["bottomCenter"],
                  onChange: (pageNumber, pageSize) => {
                    console.log({ pageNumber, pageSize });
                  },
                }}
              />
            </Card>
          </div>
        </div>
      </React.Fragment>
    );
}
