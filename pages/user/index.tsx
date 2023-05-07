import Head from 'next/head';
import Image from 'next/image';
// import Link from 'next/link';
import React, { Component } from 'react';
import Layout from '../../components/Layouts/MainLayout';
// import { admins, supervisors } from '../../configs/config';
import {EditOutlined} from "@ant-design/icons";
import { get_user_details } from '../../services/user.service';
import { Modal } from 'antd';
import ProfileEdit from '../../components/ProfileEdit/ProfileEdit';
// import {admins, supervisors} from '../../configs/config';
export default class Index extends Component {

    state: any = {
        user: null,
        token: null,
        isModalShow: false,
        user_change_time: new Date().getTime(),
    };

    constructor(props: any) {
        super(props);
        // this.setState({ user: props || null }, () => {
        //     console.log({state: props});
        // });
    }

    componentDidMount() {
        // this.setState({ user: JSON.parse(localStorage.getItem("user") || "{}") });
        this.setState({ ...this.props });
    }



    render() {
        const {user, isModalShow, token, user_change_time} = this.state;
        const setIsModalShow = (value: boolean) => {
            this.setState({ isModalShow: value }, async () => {
                const user_res: any = await get_user_details(token);
                this.setState({ user: user_res?.data || null, user_change_time: new Date().getTime() });
            });
        };
        return (
        <React.Fragment>
            <Head>
            <title>User Profile</title>
            <meta name="description" content="This is our about page" />
            <link rel="icon" href="/logo.png" />
            </Head>
            <Layout time={user_change_time}>
                <Modal
                    title="Profile"
                    open={isModalShow ? true : false}
                    onCancel={() => setIsModalShow(!isModalShow)}
                    footer={null}
                >
                    <ProfileEdit user={user} callback={setIsModalShow} />
                </Modal>
                <main className="p-2 md:p-12 md:mx-20 z-0">
                    <div className="flex justify-center gap-4">
                        <div className="max-w-lg py-5 px-5 bg-white shadow-lg rounded-lg mt-3 relative">
                            <button className='flex flex-col justify-center p-2 text-lg font-semibold rounded-full absolute top-[6rem] right-[22%] hover:text-red-500 hover:bg-red-200 bg-gray-400 text-white transition-all duration-300 cursor-pointer leading-tight' onClick={() => setIsModalShow(!isModalShow)}>
                                <EditOutlined />
                            </button>
                            <div className="flex justify-center md:justify-center -mt-16">
                                    <img
                                        className="object-cover rounded-full border-2 border-indigo-500" 
                                        style={{width: '10rem', height: '10rem'}}
                                        src={user?.avatar || "https://i.ibb.co/qDtQqH8/teacher-avatar.png"}
                                        alt="avatar"
                                    />
                            </div>
                            <div>
                            <h2 className="text-gray-800 mt-3 text-3xl font-extrabold capitalize">{user?.user_name}</h2>
                            <div className='flex gap-10'>
                                <h2 className="mt-2  text-2xl font-bold text-gray-600 capitalize ">{user?.user_role}</h2>
                                <p className="text-red-700 my-2 text-2xl font-bold ">
                                    {user?.blood_group}
                                </p>    
                            </div>
                            <p className="text-gray-700 my-2 text-xl font-semibold">
                                Last Donation Date: {
                                    user?.last_donation_date
                                    ? <span className='text-green-500'>{new Date(user?.last_donation_date)?.toDateString()}</span>
                                    : <span className='text-orange-500'>User did not donate yet</span>
                                }
                            </p>
                            <div className="flex flex-col md:flex-row gap-4">
                                <p className="mt-2 text-gray-600">EMAIL: {user?.email}</p>
                                <p className="mt-0 md:mt-2 text-gray-600">MOBILE: {user?.phone}</p>
                            </div>
                            </div>
                            <div className="flex justify-start mt-4 w-full overflow-hidden">
                                <a href={user?.facebook_url} target={'_blank'} className="text-2xl font-medium text-indigo-600 hover:text-amber-500">
                                    {user?.facebook_url}
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
        )
    }
}

export async function getServerSideProps(context: any) {
    // token from cookie
    const token = context.req.cookies.access_token;
    if (!token) {
      return {
        redirect: {
          destination: "/user/login",
          permanent: false,
        },
      };
    }

    const user_res: any = await get_user_details(token);
  
    return {
        props: {
            user: user_res?.data || null,
            token
        }
    };
}
