import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css'
import formStyles from '../styles/form.module.css'
import { checkEmail } from '../components/utils/email'
import { headers } from 'next/dist/client/components/headers';

export default function paymentsucess() {
    const [email, setEmail] = useState('');
    const [isvalidEmail, setIsValidEmail] = useState(true);
    const [username, setUserName] = useState('');
    const [recording, setRecording] = useState(false);
    const [audioBlobFile, setAudioBlob] = useState(null);
    const [audioURL, setAudioURL] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isHasRecording, setIshasRecording] = useState(false);
    const [isSentRecording, setSentRecording] = useState(false);
    // const [formData, setFormData] = useState('')
    const handleStartRecording = async () => {
        setRecording(false);
        setAudioURL('');
        // audioChunksRef.current = [];
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };
        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
            setAudioBlob(audioBlob);
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioURL(audioUrl);
            audioChunksRef.current = [];
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const handleStopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    const handleEmailChange = (e) => {
        const enteredEmail = e.target.value;
        const isValid = checkEmail(enteredEmail);
        setEmail(enteredEmail);
        setIsValidEmail(isValid);
    };

    const handleSubmitRecording = async () => {
        if (email && username && isvalidEmail) {
            await SubmitRecording()
        }
        else {
            alert('請輸入完整的email和電話')
        }
    };
    const SubmitRecording = async () => {

        setIsSubmitting(true);
        setSentRecording(false);

        const responserecording = await fetch('/api/get-recording', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const datarecording = await responserecording.json();

        if (datarecording.length != 0) {
            setIshasRecording(true);
        } else {
            console.log(audioURL);

            // create a new recording

            // console.log('create recording');
            // await fetch('/api/create-recording', {
            //     method: 'POST',
            //     body: JSON.stringify({ username, email }),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         if (data.message == 'success') {
            //             setSentRecording(true);

            //         }
            //     })
            //     .catch((err) => {
            //         console.error(err);
            //     })

            const formData = new FormData();
            formData.append('audio', audioBlobFile)
            formData.append('username', username)
            formData.append('email', email)
            console.log(username)
            try {
                const response = await fetch('/api/send-audioemail', {
                    method: 'POST',
                    body: formData,

                });
                const data = await response.json();
                console.log(data);
                if (data.message == 'success') {
                    setSentRecording(true);
                }
            } catch (error) {
                console.error('Error uploading audio:', error);
            }

        }
        setIsSubmitting(false);


    }
  
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
                <meta name="robots" content="noindex,nofollow" />
            </Head>
            <section>
                <div className={`${utilStyles.textMd} ${formStyles.formcontent}`}>

                    <div className={formStyles.formtitle}>
                        <p className={utilStyles.textLg} >錄下你/妳的發音</p>
                    </div>
                    <br/>
                    <div className={utilStyles.textSm}>
                        <p>請念出以下句子, 並按下錄音寄出給我們</p>
                    
                        <p>1. Is the laundry dry yet? I’ve been waiting for hours!</p>
                        <p>2. My brother says he doesn’t have any siblings. Mom, what do you think about that?</p>
                        <p>3. There’s a construction cone blocking the road ahead. Let’s turn left instead.</p>
                    </div>
                    <br />
                    <div className={utilStyles.flexcc}>
                        {recording ? (
                            <button className={formStyles.button} onClick={handleStopRecording}>停止錄音</button>)
                            : (<button className={formStyles.button} onClick={handleStartRecording}> {audioURL ? '重新錄音' : '開始錄音'}</button>)
                        }
                    </div>
                    {audioURL && (
                        <div className={formStyles.audioresult}>
                            <audio controls src={audioURL} type="audio/mp3" />
                            
                            <div className={formStyles.inputcontent}>
                                <div className={formStyles.inputcontanier}>
                                    {/* <div className={formStyles.inputlabel}>Name</div> */}
                                    <div className={formStyles.inputbox} >
                                        <input className={formStyles.input} placeholder="name" type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
                                    </div>
                                </div>
                                <div className={formStyles.inputcontanier}>
                                    {/* <div className={formStyles.inputlabel}>Email</div> */}

                                    <div className={formStyles.inputbox} >
                                        <input className={formStyles.input} placeholder="email" type="email" value={email} onChange={handleEmailChange} />
                                        {!isvalidEmail && <span className={`${formStyles.invalid} ${formStyles.textSm}`}>請輸入正確email</span>}
                                    </div>
                                </div>

                                <div className={utilStyles.flexccc}>
                                    {!isHasRecording && !isSentRecording && <button className={formStyles.button} onClick={handleSubmitRecording}>錄音</button>}
                                    {isSubmitting && <p>傳送中...</p>}
                                    {isHasRecording && <p>未傳送, something goes wrong!</p>}
                                    {isSentRecording && <p>已傳送錄音給老師</p>}
                                </div>
                            </div>
                            <br/>
                            <div className={utilStyles.textSm}>
          
                                <p>*相同Email僅限一次課前評估, 請您送出前確認錄音內容是否完整 </p>
                                <p>*若己經預約同學請填寫與預約時相同的Email</p>

                            </div>
                        </div>
                    )}
                </div>

            </section>
        </Layout>
    );
};


