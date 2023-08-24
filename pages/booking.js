import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout'
import { checkEmail } from '../components/utils/email'
import utilStyles from '../styles/utils.module.css'
import formStyles from '../styles/form.module.css'

export default function Order() {
  const router = useRouter();
  const [username, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [allowtosend, setAllowToSend] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [amount, setAmount] = useState('');
  const [itemname, setItemName] = useState('');
  const [bookingdate, setBookingdate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false)
  const teacherid = 1;
  const [options, setOptions] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      await fetch('/api/get-timesheet', {
        method: 'POST',
        body: JSON.stringify({ teacherid }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {

          setOptions(data)
          console.log(data)
        })
        .catch(error => {
          console.log(error);
          // router.push('/error')
        });
    }

    fetchData();
  }, [teacherid]);

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    const isValid = checkEmail(enteredEmail);
    setEmail(enteredEmail);
    setIsValidEmail(isValid);
  };

  const handleSubmit = async () => {
    if (username && phone && isValidEmail) {
      Submit();
    } else {
      alert('請輸入名子, Email和電話')
    }
  };

  const Submit = async () => {
    // e.preventDefault();
    setIsSubmitting(true);

    await fetch('/api/create-booking', {
      method: 'POST',
      body: JSON.stringify({ username, phone, email, itemname, amount, bookingdate, allowtosend }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.orderid) {
          router.push(`/checkout/${data.orderid}`);
        }
      })
      .catch(error => {
        console.log(error);
      });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <div className={`${utilStyles.textMd} ${formStyles.formcontent}`}>
          <div className={formStyles.formtitle}>
            <p className={utilStyles.textLg} >課程預約</p>
          </div>

          <div className={utilStyles.flexc}>
            <div className={formStyles.twomode}>
              <h3 className={formStyles.twomodeheader}>Child</h3>
              <h5>(1 child) 2000/hr NTD </h5>
              <h5>(2 children) 3000/hr NTD</h5>
            </div>
            <div className={formStyles.twomode}>
              <h3 className={formStyles.twomodeheader}>Adult</h3>
              <h5>3000/hr NTD</h5>

            </div>
          </div>
          <br />
  
          <div className={formStyles.inputcontent}>
            <div className={formStyles.inputcontanier}>
              <div className={formStyles.inputbox} >
                <input className={formStyles.input} placeholder="name" type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
              </div>
            </div>
            <div className={formStyles.inputcontanier}>
              {/* <div className={formStyles.inputlabel}><p>連絡電話:*</p></div> */}
              <div className={formStyles.inputbox} >
                <input className={formStyles.input} placeholder="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            <div className={formStyles.inputcontanier}>
              {/* <div className={formStyles.inputlabel}><p>email:*</p></div> */}
              <div className={formStyles.inputbox} >
                <input className={formStyles.input} placeholder="email" type="email" value={email} onChange={handleEmailChange} />
                <p className={formStyles.invalid}>{!isValidEmail && '請輸入正確email'}</p>
              </div>
            
            </div>
            <div className={formStyles.inputcontanier}>   
              <input type='checkbox' value={allowtosend} onChange={(e)=>setAllowToSend(e.target.value)}></input> 
              <p className={utilStyles.textSm}> Yes, AccentCoach can email me with promotions and news. (optional)</p>
         </div>
 
            <div className={formStyles.inputcontanier}>
              {/* <label className={formStyles.inputlabel} for="amount">大人/小孩:*</label> */}
              <div className={formStyles.inputbox} >
                <select className={formStyles.select} id="amount" name="amount" value={itemname} onChange={(e) => { setAmount(e.target.value.split('-')[1]); setItemName(e.target.value) }}>
                  <option value="0">預約項目</option>
                  <option value="大人-3000-1人">大人(3000)- 1人</option>
                  <option value="小孩-3000-2人">小孩(3000)- 2人</option>
                  <option value="小孩-2000-1人">小孩(2000)- 1人</option>
                </select>
              </div>
            </div>
            <div className={formStyles.inputcontanier}>
              {/* <label className={formStyles.inputlabel} for="bookingdate">預約日期時段:*</label> */}
              <div className={formStyles.inputbox} >
                <select className={formStyles.select} id="bookingdate" name="bookingdate" value={bookingdate} onChange={(e) => setBookingdate(e.target.value)}>
                  <option value="1900-01-01">預約日期時段</option>
                  {options.map((option, _index) => (
                    <option key={_index} value={option.opendatetime.replace('T', ' ').replace(':000Z', '')}>{option.opendatetime.replace(':00.000Z', '').replace('T', ' ')}</option>))}
                </select>
              </div>
            </div>
            <div className={utilStyles.flexccc}>
              <button className={formStyles.button} type="submit" onClick={handleSubmit}>預約課程</button>
              <p>{isSubmitting ? ' 預約中...' : ''}</p>
            </div>
         <br/>
          <div className={utilStyles.textSm}>
            <p>*請務必留意填寫電話與Email透過<span className={formStyles.inlinelink}><Link href="/search">查詢</Link></span>目前預約狀態</p>
            <p>*預約上課時間前48小時前取消可提供全額退款</p>
            
          </div>
          </div>
        </div>
      </section >
    </Layout >
  );
};

