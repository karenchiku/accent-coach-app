import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout, { siteTitle } from '../../components/layout'
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css'
import formStyles from '../../styles/form.module.css'

export default function paymentsucess() {
    
    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    };

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
                <meta name="robots" content="noindex,nofollow" />
            </Head>
            <section>
                <div className={utilStyles.textMd}>
                    <div className={formStyles.formtitle}>
                        <h1>付款結果</h1>
                    </div>
                    <div>
                        <div className={utilStyles.headingMd}><p>款成成功</p></div>

                        <div className={utilStyles.flexcc}>
                            <button className={formStyles.button} onClick={handleClick}>返回主頁</button>

                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};


