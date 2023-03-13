import Head from 'next/head';
import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';

class blog extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            slug: props.slug,
            title: props.title,
        };
    }

    render() {
        const { slug, title }: any = this.state;
        return (
            <React.Fragment>
                <Head>
                    <title>Blog: {title}</title>
                    <link rel="icon" href="/logo.png" />
                </Head>
                <Navigation/>
                <main>
                    <h1 
                        className='
                            text-center text-green-500
                            md:text-orange-500
                            lg:text-red-500
                            hover:text-blue-500
                            font-extrabold
                            tracking-wide hover:tracking-wider
                        '
                    >
                            Blog: {slug}
                    </h1>
                </main>
                <Footer/>
            </React.Fragment>
        );
    }
}

export async function getServerSideProps(context: any) {
    // const {slug} = context.query;
    const {slug} = context.params;
    return {
        props: {
            slug: slug,
            title: "Coming Soon",
        },
    };
}
export default blog;