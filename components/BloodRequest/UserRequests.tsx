import { Button, Card, Popconfirm, Table, Tooltip } from "antd";
import { MessageOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React from "react";
import { request_data } from "./dummy_requests";
import Cookies from "js-cookie";
import { get_all_requests } from "../../services/blod.request.service";

export default function UserRequests() {
  const navigate = useRouter();
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [textId, setTextId] = React.useState(0);
  React.useEffect(() => {
    const columns: any = [
      {
        title: "Name",
        dataIndex: "patient_name",
        key: "patient_name",
      },
      {
        title: "Blood Group",
        dataIndex: "blood_group",
        key: "blood_group",
        align: "center",
      },
      {
        title: <span className="text-red-500 text-[12px] font-bold">Blood Quantity</span>,
        dataIndex: "blood_quantity",
        key: "blood_quantity",
        align: "center",
        render: (text: any, record: any) => (
          <span className="text-red-500 text-[12px] font-bold">
            {text}
            {text > 1 ? " Bags" : " Bag"}
          </span>
        ),
      },
      {
        title: "Cause",
        dataIndex: "cause",
        key: "cause",
      },
      {
        title: <span className="text-[12px] font-bold">Medical Name</span>,
        dataIndex: "medical_name",
        key: "medical_name",
        align: "center",
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        align: "center",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        align: "center",
        width: "20%",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        align: "center",
      },
      {
        title: "Message",
        dataIndex: "message",
        key: "message",
        align: "center",
        render: (text: any, record: any) => (
          <Tooltip
            title={<p className="text-justify">{text}</p>}
            color={"magenta"}
            key={record.id}
          >
            {/* <p className="text-[magenta]">Message</p> */}
            <MessageOutlined className="cursor-pointer text-[magenta] hover:text-[#ff00ff] hover:scale-110 transform transition-all duration-300" />
          </Tooltip>
        ),
      },
      // {
      //   title: "Action",
      //   dataIndex: "action",
      //   key: "action",
      //   align: "center",
      //   render: (text: any, record: any) => (
      //     <Button type="dashed" danger>
      //       Delete
      //     </Button>
      //   ),
      // },
    ];

    const token = Cookies.get("access_token");
    if (token) {
      columns.push({
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        render: (text: any, record: any) => (
          <Popconfirm
            title="Delete Record"
            description="Are you sure to remove this request?"
            onConfirm={() =>
              confirm().then(() => {
                console.log("deleted");
                const newData = data.filter(
                  (item: any) => item.key !== record.key
                );
                setData(newData);
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
        ),
      });
    }

    const data = request_data;
    setColumns(columns);
    // setData(data);
    getBloodRequests();
  }, [""]);

  const getBloodRequests = async () => {
    const res = await get_all_requests();
    setData(res?.data);
  };

  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    });

  return (
    <React.Fragment>
      <div className="bg-green-100 min-h-[50vh] w-full px-8 py-5">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-4xl font-bold text-red-500">Blood Requests</p>
          <p className="text-xl text-center">
            Donate Your Blood And Inspires To Others
          </p>
          <button
            onClick={() => navigate.push("/register")}
            type="button"
            className="my-3 rounded-full text-red-500 hover:bg-red-500 hover:text-white py-2 px-10 ring-2 ring-green-500 text-xl transition-all duration-300"
          >
            Be A Donor
          </button>
          <Card bordered={true}>
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
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}
