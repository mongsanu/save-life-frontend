import { Button, Input, Modal, notification } from 'antd';
import Cookies from 'js-cookie';
import React from 'react';

export default function SendMessage({isOpen, user, handleShowModal, title, send_email}: any) {

    const [message, setMessage] = React.useState<string>("");
    const [subject, setSubject] = React.useState<string>("");
    const [contact, setContact] = React.useState<string>("");
    const token = Cookies.get("access_token");
    const handleSendMessage = async () => {
        console.log({message});
        if(!message || !subject || !contact) {
            notification.warning({
                message: "Please Fill All Fields",
                placement: "bottomRight",
                duration: 2
            })
            return;
        }
        const body = {
            subject,
            message,
            contact,
            email: user?.email,
            user_name: user?.user_name
        }
        const email_res = await send_email(body);
        if(email_res?.status) {
            notification.success({
                message: "Success",
                description: email_res.message,
                placement: "bottomRight",
                duration: 2
            })
            setMessage("");
            setSubject("");
            handleShowModal(false);
        } else {
            notification.error({
                message: "Error",
                placement: "bottomRight",
                duration: 2
            })
        }
    }
    
    return (
        <React.Fragment>
            <Modal
                title={title || "Send Email To Donor"}
                open={isOpen}
                onOk={() => {
                    handleSendMessage();
                }}
                onCancel={() => {
                    handleShowModal(false);
                }}
                footer={<div className='flex gap-3 justify-center'>
                    <Button onClick={() => {
                        handleShowModal(false);
                    }}>
                        Cancel
                    </Button>
                    <Button type="primary" danger onClick={() => {
                        handleSendMessage();
                    }}>
                        Send
                    </Button>
                </div>}
                
                centered
                // width={"800"}
            >
                <div className="flex flex-col justify-center px-10 py-4 xs:px-0">
                    <img 
                        className="w-20 h-20 rounded-full"
                        src={user?.avatar || "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"} 
                        alt="avatar" 
                    />
                    <div className='flex gap-5'>
                        <div>
                            <p className="text-lg font-bold text-gray-700 capitalize">Name</p>
                            <p className="text-lg font-bold text-gray-700 capitalize">Email</p>
                            <p className="text-lg font-bold text-gray-700 capitalize">Phone</p>
                            {
                                !title?.includes("Admin")
                                ? <p className="text-lg font-bold text-gray-700 capitalize">Blood Group</p>
                                : null
                            }
                            
                        </div>
                        <div>
                            <p className="text-lg font-bold text-gray-700 capitalize">
                                : {user?.user_name || "N/A"}
                            </p>
                            <p className="text-gray-500 text-lg">
                                : {user?.email || "N/A"}
                            </p>
                            <p className="text-gray-500 text-lg">
                                : {user?.phone || "N/A"}
                            </p>
                            {
                                !title?.includes("Admin")
                                ? <p className="text-gray-500 text-lg">
                                    : {user?.blood_group || "N/A"}
                                </p>
                                : null
                            }
                            
                        </div>
                    </div>
                    <Input
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => {
                            setSubject(e.target.value);
                        }}
                        className='my-3'
                    />
                    <Input
                        placeholder="Contact"
                        value={contact || ""}
                        onChange={(e) => {
                            // validation Bangladeshi Phone Number
                            console.log({value: e.target.value});
                            
                            setContact(e.target.value);
                        }}
                        className='my-3'
                    />
                    <Input.TextArea
                        placeholder="Write Your Message Here"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        className='my-3'
                        style={{resize: "none"}}
                        rows={4}
                    />
                </div>
            </Modal>
        </React.Fragment>
    )
}
