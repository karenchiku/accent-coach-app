import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout, { siteTitle } from '../../components/layout'
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css'
import formStyles from '../../styles/form.module.css'

export default function Payment() {
  const router = useRouter();
  const {orderid } = router.query;
  const [booking, setBooking] = useState([]);
  const [isloading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {

    setIsLoading(true);
    const fetchData = async () => {

      // await fetch(`/api/get-booking/${orderid}`)
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
            // console.log(booking)
            setIsLoading(false);
          }

        })
        .catch(err => {
          console.log(err);
        });
    }

    fetchData();

  }, [orderid])

  const handlePayment = async () => {
    setIsSubmitting(true)
    await fetch('/api/ecpay-addcheckvalue', {
      method: 'POST',
      body: JSON.stringify({ orderid, 'amount': booking.amount, 'itemname': booking.itemname, 'bookingdate': booking.bookingdate, 'email': booking.email }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        let form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5');
        form.setAttribute('enctype', 'application/x-www-form-urlencoded');
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const input = document.createElement("input");
            input.type = "hidden"
            input.name = key;
            console.log(data[key])
            input.value = data[key];
            form.appendChild(input);
          }
        }
        console.log(form)
        document.body.appendChild(form);
        form.submit();

        setIsSubmitting(false)

      }).catch(err => {
        console.log(err);
        setIsSubmitting(false)
      });
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
              <p className={utilStyles.textLg} >Order Summary</p>
          
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

              <div className={formStyles.line}></div>
            
              <div className={formStyles.confirmcontainer}>
                <div>付款金額</div>
                <div>NTD ${booking.amount}</div>
              </div>

              <div className={utilStyles.flexccc}>
      
                <button className={formStyles.button} onClick={handlePayment}>前往付款</button>
                {isSubmitting && '付款轉跳中...'}
              </div>
               <br/>
              <div className={utilStyles.textSm}>
                <p>*By completing this appointment, you agree to AccentCoach's Terms of Use & Privacy Policy.</p>
              </div>
            </div>
          </div>
        </section>) : null}
    </Layout>
  );
};


