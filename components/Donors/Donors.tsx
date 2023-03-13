import { Button, Card, Skeleton, Table, Select } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { MessageOutlined } from "@ant-design/icons";
import { districts, divisions, unions, upazillas } from "../../configs/config";
import { donors_data } from "./dummy_donors";
import SendMessage from "./SendMessage";
import { find_donors, send_email_to_donor } from "../../services/user.service";
const { Option } = Select;

const blood_groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export default function Donors() {
  const navigate = useRouter();
  const [bloodGroup, setBloodGroup] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [upazilla, setUpazilla] = React.useState("");
  const [union, setUnion] = React.useState("");
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [userData, setUserData] = React.useState({});
  const [sendMessageUser, setSendMessageUser] = React.useState<any>(null);
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
        fontSize: 5
      },
      {
        title: "Blood Group",
        dataIndex: "blood_group",
        key: "blood_group",
        align: "center",
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        align: 'center',
        render: (text: any, record: any) => {
          // console.log({record});
          return text;
        }
      },
      {
        title: <span className="text-[12px] ">Last Donation</span>,
        dataIndex: "last_donation_date",
        key: "last_donation_date",  
        align: "center",
        render: (text: any, record: any) => (
          <span className="text-red-500 font-bold text-[12px]">
            {
              new Date(text).toLocaleDateString()
            }
          </span>
        ),
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        align: "center",
        render: (text: any, record: any) => ( 
          <span className="text-[12px]">
            {text}
          </span>
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
        render: (text: any, record: any) => (
          divisions.find((division: any) => division.id === text)?.name
        ),
      },
      {
        title: "District",
        dataIndex: "district",
        key: "district",
        align: "center",
        render: (text: any, record: any) => (
          districts.find((district: any) => district.id === text)?.name
        ),
      },
      {
        title: "Upazilla",
        dataIndex: "upazilla",
        key: "upazilla",
        align: "center",
        render: (text: any, record: any) => (
          upazillas.find((upazilla: any) => upazilla.id === text)?.name
        ),
      },
      {
        title: "Union",
        dataIndex: "union",
        key: "union",
        align: "center",
        render: (text: any, record: any) => (
          unions.find((union: any) => union.id === text)?.name
        ),
      },
      {
        title: "FB Profile",
        dataIndex: "facebook_url",
        key: "facebook_url",
        align: "center",
        render: (text: any, record: any) => (
          <a className="text-center w-[20px] h-[20px] m-auto flex justify-center items-center" href={text} target="_blank">
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
    const token = Cookies.get("access_token");
    if (token) {
      columns.push({
        title: "Action",
        dataIndex: "email",
        key: "email",
        align: "center",
        render: (text: any, record: any) => (
          <span
            onClick={() => {
              setSendMessageUser(record);
            }}
          >
            <MessageOutlined className="cursor-pointer text-[magenta] hover:text-[#ff00ff] hover:scale-110 transform transition-all duration-300" />
          </span>
        ),
      });
    }

    // const data = donors_data;
    setColumns(columns);
    if(!data?.length) {
      getDonors();
    } 
    
  }, [""]);
  
  const getDonors = async () => {
    const result = await find_donors();
    if(result?.status){
      let data = result?.data;
      setData(data);
      if(bloodGroup){
        data = data.filter((item: any) => item.blood_group === bloodGroup); 
        if(division){
          data = data.filter((item: any) => item.division === division); 
          if(district){
            data = data.filter((item: any) => item.district === district); 
            if(upazilla){
              data = data.filter((item: any) => item.upazilla === upazilla); 
              if(union){
                data = data.filter((item: any) => item.union === union); 
              } else {
                setFilteredData(data)
              }
            } else {
              setFilteredData(data)
            }
          } else {
            setFilteredData(data);
          }
        } else {
          setFilteredData(data);
        }
      } else {
        setFilteredData(data)
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
    if(bloodGroup) {
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
      getDonors();
    }
  };



  

  return (
    <React.Fragment>
      <SendMessage
        isOpen={sendMessageUser ? true : false}
        user={sendMessageUser}
        handleShowModal={handleShowModal}
        send_email={send_email_to_donor}
      />
      <div className="bg-rose-100 min-h-[50vh] w-full px-8 py-8">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-4xl font-bold text-red-500">Find A Donor</p>
          <p className="text-xl text-center">
            Together we can make a difference by donating blood
          </p>
          <button
            onClick={() => navigate.push("/register")}
            type="button"
            className="my-3 rounded-full text-red-500 hover:bg-red-500 hover:text-white py-2 px-10 ring-2 ring-green-500 text-xl transition-all duration-300"
          >
            Be A Donor
          </button>
          <Card
            title={
              <div className="mt-3">
                <p className="text-2xl font-bold text-center lg:text-left">
                  Filter Donors
                </p>
                <div className="w-full grid lg:hidden grid-cols-1 lg:grid-cols-5 gap-2 sm:grid-cols-3 mt-2">
                  <div>
                    <Select
                      placeholder="Blood Group"
                      className="w-full"
                      value={bloodGroup || "Blood Group"}
                      onChange={(value) => {
                        setBloodGroup(value);
                        setDivision("");
                        setDistrict("");
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
                      {blood_groups.map((blood_group) => (
                        <Option key={blood_group} value={blood_group}>
                          {blood_group}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div>
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
                      showSearch
                      allowClear
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
                  </div>
                  <div>
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
                  </div>
                  <div>
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
                  </div>
                  {/* <div>
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
                  </div> */}
                  <div>
                    <Button
                      type="dashed"
                      ghost
                      danger
                      block
                      onClick={() => {
                        handleFilter();
                      }}
                    >
                      Filter
                    </Button>
                  </div>
                </div>
              </div>
            }
            extra={
              <div className="hidden lg:grid md:grid-cols-3 lg:grid-cols-5 gap-2 sm:grid-cols-1 mt-3">
                <div>
                  <Select
                    placeholder="Blood Group"
                    className="w-full"
                    value={bloodGroup || "Blood Group"}
                    onChange={(value) => {
                      setBloodGroup(value);
                      setDivision("");
                      setDistrict("");
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
                    {blood_groups.map((blood_group) => (
                      <Option key={blood_group} value={blood_group}>
                        {blood_group}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div>
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
                    showSearch
                    allowClear
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
                </div>
                <div>
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
                </div>
                <div>
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
                </div>
                {/* <div>
                  <Select
                    placeholder="Select Union"
                    className="w-full"
                    value={union || "Select Union"}
                    disabled={!upazilla || !district || !division || !bloodGroup}
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
                </div> */}
                <div>
                  <Button
                    type="dashed"
                    ghost
                    danger
                    block
                    onClick={() => {
                      handleFilter();
                    }}
                  >
                    Filter
                  </Button>
                </div>
              </div>
            }
            className="w-full h-full"
            bordered={true}
          >
            <Skeleton loading={isLoading} avatar>
              <Table
                loading={isLoading}
                columns={columns}
                dataSource={filteredData}
                rowKey={(record: any) => record?._id}
                size="small"
                style={{ width: "100%", fontSize: "8px" }}
                scroll={{
                  x: 280,
                  y: 320,
                }}
                pagination={{
                  total: data?.length,
                  pageSize: 5,
                  //   showSizeChanger: true,
                  //   pageSizeOptions: ["5", "10", "20"],
                  position: ["bottomCenter"],
                  onChange: (pageNumber, pageSize) => {
                    console.log({ pageNumber, pageSize });
                  },
                }}
              />
            </Skeleton>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}
