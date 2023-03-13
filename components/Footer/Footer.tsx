import React from 'react';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className={styles?.footer}>
            <div className={'flex gap-2 text-extrabold text-indigo-600'}>
                <div className='flex justify-center text-bold'>
                    @Copyright {new Date().getFullYear()}
                    <span className='mx-2'>|</span>
                    <Link href="/">
                        <a className='hover:text-amber-500'>
                            <img className='animate-spin md:animate-none mr-2 duration-1000 ease-in-out' 
                                width={25} height={10} src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" 
                                alt="Logo" 
                            />
                            Save Lives BD
                        </a>
                    </Link>
                </div>
            </div>
      </footer>
    );
};

export default Footer;