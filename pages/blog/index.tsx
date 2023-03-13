import Head from 'next/head';
import React from 'react';
import Layout from '../../components/Layouts/MainLayout';

const index = () => {
    return (
        <React.Fragment>
            <Head>
                <title>Popular Blogs</title>
                <meta name="description" content="This is our about page" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <Layout>
                <main className="p-12 px-16">
                    <h1 className="text-3xl mb-10 text-center uppercase font-bold">
                        Popular Blogs
                    </h1>                
                </main>
            </Layout>            
        </React.Fragment>
    );
};

export default index;