import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout, { siteTitle } from '../../components/layout'
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css'
import formStyles from '../../styles/form.module.css'

export default function paymentsucess() {

    const router = useRouter();
    const { orderid } = router.query;
    const [booking, setBooking] = useState([]);
    const [isloading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            await fetch('/api/get-booking', {
                method: 'POST',
                body: JSON.stringify({ orderid }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data[0]) {
                        setBooking(data[0]);
                        // console.log(booking);
                        setIsLoading(false);
                    }

                })
                .catch(error => {
                    console.log(error);
                });
        }
        fetchData();
        // setIsLoading(true);
    }, [orderid])
    const handleSearch = () => {
        router.push('/search');
    };
    const handleClick = () => {
        router.push('/');
    };

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
                <meta name="robots" content="noindex,nofollow" />
            </Head>
            {!isloading ? (
                <section>
                    <div className={`${utilStyles.textMd} ${formStyles.formcontent}`}>
                        <div className={formStyles.formtitle}>
                            {booking.paystatus == 1 && <h1>付款結果 : 付款成功 </h1> }
                            {booking.paystatus != 1 && <h1>付款結果 : 待付款 </h1> }
                        </div>
                        <div className={formStyles.confirmbox}>

                            <div className={formStyles.confirmcontainer}>
                                <div>訂單編號</div>
                                <div>{booking.orderid}</div>
                            </div>

                            <div className={formStyles.confirmcontainer}>
                                <div>使用者名稱</div>
                                <div>{booking.username}</div>
                            </div>

                            <div className={formStyles.confirmcontainer}>
                                <div>連絡電話</div>
                                <div>{booking.phone}</div>
                            </div>

                            <div className={formStyles.confirmcontainer}>
                                <div>Email</div>
                                <div>{booking.email}</div>
                            </div>

                            <div className={formStyles.confirmcontainer}>
                                <div>預約項目</div>
                                <div>{booking.itemname}</div>
                            </div>

                            <div className={formStyles.confirmcontainer}>
                                <div>預約日期</div>
                                <div>{booking.bookingdate}</div>
                            </div>


                            <br />
                            <div className={utilStyles.flexcc}>
                                <button className={formStyles.button} onClick={handleSearch}>查詢訂單</button>
                                <button className={formStyles.button} onClick={handleClick}>返回主頁</button>
                            </div>

                            <p className={utilStyles.textSm}>感謝你的預約, 請務必在課程前到測試區錄音, 老師確認後會另外發Email到您的信箱</p>


                        </div>
                    </div>
                </section>
            ) : null}
        </Layout>
    );
};


