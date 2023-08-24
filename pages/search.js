import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css'
import formStyles from '../styles/form.module.css'
import { checkEmail } from '../components/utils/email'



export default function querybooking() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [username, setUserName] = useState('');
  const [orders, setOrders] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOrders, setIsOrders] = useState(false)


  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    const isValid = checkEmail(enteredEmail);
    setEmail(enteredEmail);
    setIsValidEmail(isValid);
  };

  const handleSubmit = async () => {
    if (phone && email && isValidEmail) {
      Submit();
    } else {
      alert('請輸入完整的email和電話')
    }
  };
  const Submit = async () => {
    setIsSubmitting(true);
    await fetch('/api/get-bookinghist', {
      method: 'POST',
      body: JSON.stringify({ username, phone, email }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setOrders(data)
        if (data) {
          setIsOrders(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
    setIsSubmitting(false);
  }


  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <div className={`${utilStyles.textMd} ${formStyles.formcontent}`}>
          <div className={formStyles.formtitle}>
            <p className={utilStyles.textLg} >預約查詢</p>
          
          </div>
          <div className={formStyles.inputcontent}>
            <div className={formStyles.inputcontanier}>
              <div className={formStyles.inputbox} >
                <input placeholder='phone' className={formStyles.input} type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            <div className={formStyles.inputcontanier}>
              <div className={formStyles.inputbox} >
                <input placeholder='email' className={formStyles.input} type="email" value={email} onChange={handleEmailChange} />
                {!isValidEmail && <p className={formStyles.invalid}>請輸入正確email</p>}
              </div>
            </div>

            <div className={utilStyles.flexccc}>
            <button className={formStyles.button} onClick={handleSubmit}>查詢預約</button>
            {isSubmitting ? ' 查詢中...' : ''}
            </div>
           <br/>
            <div className={utilStyles.textSm}>
              <div className={utilStyles.pbold}>注意事項</div>
              <p>*查詢時請填寫與預約時相同的電話與email</p>
            </div>
            </div>
        </div>
      </section>
      <br/>
      {isOrders ? (
        <section>
          <div>
            <div className={formStyles.formtitle}>
              <p className={utilStyles.textLg} >您的預約明細</p>
              </div>
            <br/>
            <div className={utilStyles.flexcc}>
              <table className={utilStyles.textSm}>
                <thead>
                  <tr>
                    <th>訂單編號</th>
                    <th>使用者名稱</th>
                    <th>電話</th>
                    <th>Email</th>
                    <th>金額</th>
                    <th>預約上課日期</th>
                    <th>付款狀態</th>
                    <th>預約狀態</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.orderid}>
                      <td>{order.orderid}</td>
                      <td>{order.username}</td>
                      <td>{order.phone}</td>
                      <td>{order.email}</td>
                      <td>{order.amount}</td>
                      <td>{order.bookingdate.replace('T', ' ').replace('.000Z', '')}</td>
                      <td>{order.paystatus == 1 ? '已付款' : '待付款'}</td>
                      <td>{order.bookstatus == 1 ? '確認預約' : '待確認預約'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>) : null}
    </Layout>
  );
};


