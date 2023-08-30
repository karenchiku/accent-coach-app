import utilStyles from '../styles/utils.module.css';
import formStyles from '../styles/form.module.css'
import Link from 'next/link';
import footerStyles from './footer.module.css';
import { useState } from 'react';


export default function Footer() {
    const [email, setEmail] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(false)
        await fetch('/api/create-newsletter', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.email === email) {
                    setSubmitSuccess(true)
                }
            })
            .catch(error => {
                console.log(error);
            });
        setIsSubmitting(false)
    };

    return (
        <div className={footerStyles.bgcontainer}>
            <div className={footerStyles.container}>
                <div className={footerStyles.info}>
                

                    <div className={footerStyles.menu}>
                        <p className={utilStyles.pbold}>聯絡我們</p>
                        <p>客服時間 : 週一至週五 10:00-18:00</p>
                        <p>客服信箱 : accentcoach.co@gmail.com</p>
                    </div>
                    <div className={footerStyles.menu}>
                        <p className={utilStyles.pbold}>Policy</p>
                        <p><Link href="/privacy">隱私權政策</Link></p>
                        <p><Link href="/terms">使用條款</Link></p>
                        {/* <p><Link href="/refund">退款政策</Link></p> */}
                    </div>
                    <div className={footerStyles.menu}>
                        <div className={footerStyles.icon}>
                            <Link href="">
                                <img src='/icon/instagram_icon.png'></img></Link>
                            <Link href="">
                                <img src='/icon/line_icon.png'></img></Link>

                        </div>
                    </div>

                </div>
                <div>
                    {/* <div className={footerStyles.newletter}>
                        <p className={utilStyles.pbold} >訂閱電子報</p>
                        <input className={formStyles.inputsubscription} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button className={formStyles.button} type="submit" onClick={handleSubmit}> Submit</button>
                        {isSubmitting ? ' 訂閱中...' : ''}
                        {submitSuccess ? (<p>訂閱成功</p>) : ''}
                    </div> */}
                </div>

                <div className={footerStyles.undertext}>
                    <p>支付功能由第三方提供</p>
                    <p>2023 Copyright © All Rights Reserverd.</p>
                </div>             
            </div>
            {/* <div className={utilStyles.space}></div> */}
        </div>
    )
}