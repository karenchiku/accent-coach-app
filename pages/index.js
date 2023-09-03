import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import formStyles from '../styles/form.module.css'
import Link from 'next/link'
// import languagesytle from '../components/language.module.css';
import { useState } from 'react'
import { useRouter } from 'next/router';
import { LanguageOption } from '../components/language';


export default function Home() {
  const router = useRouter();
  const [language, setLanguage] = useState('zh');
  const [questionopen, setQuestionopen] = useState([false, false, false, false, false]);

  const [q1option, setQ1option] = useState(false);
  const [q2option, setQ2option] = useState(false);
  const [q3option, setQ3option] = useState(false);
  const [q4option, setQ4option] = useState(false);
  const [q5option, setQ5option] = useState(false);


  const handleSubmit = async () => {
    router.push('/booking')
  }

  const handleRecording = async () => {
    router.push('/new')
  }
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <LanguageOption language={language} setLanguage={setLanguage} />


      <section>
        <div className={utilStyles.flexcc}>
          <object
            data="/svg/accent a animated.svg"
            className={utilStyles.imageslarge}
          />

        </div>
        {/* <h3 className={utilStyles.headingLg}>
          {language === 'en' ? `What you Look like != What you SOUND like` : ' 你看起來像什麼 != 你聽起來像什麼'}
        </h3> */}
        <div className={utilStyles.flexcc}>
          <object
            data="/svg/accent b animated.svg"
            className={utilStyles.imageslarge}
          />
        </div>
      </section>
      {/* <div className={utilStyles.space}></div> */}
      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>
          {language === 'en' ? 'Why ?' : '為什麼 ?'}
        </h1>

        <h4>
          {/* {language === 'en' ? `We don't get to choose every aspect of our identities but we CAN CHOOSE some!` : '我們不能選擇自己各方面的身份, 但我們可以選擇其中的一部分'} */}
        </h4>

        <div className={`${utilStyles.textMd} ${utilStyles.textbox}`}>
          <p>{language === 'en' ? '- speak smoothly' : ' -  說話流暢'}</p>
          <p>{language === 'en' ? '- build confidence' : ' - 建立自信'}</p>
          <p>{language === 'en' ? '- create attitude' : ' - 塑造態度'}</p>
          <p>{language === 'en' ? '- career opportunities' : ' - 職業機會'}</p>
          <p>{language === 'en' ? '- increase hearing sensitivity' : ' - 提高聽覺敏感度'}</p>
          <p>{language === 'en' ? '- expand Skillset' : ' - 擴展技能範圍'}</p>
          <p>{language === 'en' ? '- sharpen vocal instrument' : ' - 磨練聲音器官'}</p>
          <p>{language === 'en' ? '- tongue flexibility' : ' - 提高舌靈活性'}</p>
          <p>{language === 'en' ? '- understand other accents better' : ' - 更好地理解其他口音'}</p>
          <p>{language === 'en' ? '- take control in what you say' : ' - 控制自己的言詞'}</p>
        </div>

      </section>
      {/* <div className={utilStyles.space}></div> */}
      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>
          {language === 'en' ? 'Who is eligible ?' : '誰符合條件 ?'} </h1>
        <div>
          <div className={utilStyles.fiveinline}>
            <h4>
              {language === 'en' ? 'Children (3yrs - 14yrs)' : '小孩 (3yrs - 14yrs)'}
            </h4>
          </div>
          <div className={utilStyles.fiveinline}>
            <h4>
              {language === 'en' ? 'Adults (15yrs+)' : '大人 (15yrs+)'}
            </h4>

          </div>
        </div>
        <div >
          <div className={utilStyles.fiveinline}>
            <h4>
              {language === 'en' ? '"Subconscious Learning"' : '"潛意識學習"'}
            </h4>

          </div>
          <div className={utilStyles.fiveinline}>
            <h4>
              {language === 'en' ? '"Focused Learning"' : '"專注學習"'}
            </h4>
          </div>
        </div>
        <div className={utilStyles.flexc}>
          <div className={utilStyles.five}>

            <div className={`${utilStyles.textMd} ${utilStyles.textbox}`}>
              <p>{language === 'en' ? ' - play' : ' - 遊戲'}</p>
              <p>{language === 'en' ? ' - picture' : ' - 圖片'}</p>
              <p>{language === 'en' ? ' - movement' : ' - 動作'}</p>
              <p>{language === 'en' ? ' - natural interest' : ' - 與生俱來興趣'}</p>
              <p>{language === 'en' ? ' - copying : hearing + speaking repetition' : ' - 模仿：聆聽 + 口語重複'}</p>
            </div>

          </div>
          <div className={utilStyles.five}>

            <div className={`${utilStyles.textMd} ${utilStyles.textbox}`}>
              <p>{language === 'en' ? ' - must know some English' : ' - 必須具備一定的英語能力'}</p>
              <p>{language === 'en' ? ' - consistent study' : ' - 持續學習'}</p>
              <p>{language === 'en' ? ' - recorder' : ' - 錄音裝置'}</p>
              <p>{language === 'en' ? ' - reading/writing/speaking goals' : ' - 閱讀、寫作、口語的目標'}</p>
              <p>{language === 'en' ? ' - hearing' : ' - 聽力'}</p>
            </div>

          </div>
        </div>
        <div className={utilStyles.flexc}>
          <div className={formStyles.twomode}>
            <h3 className={formStyles.twomodeheader}>Child</h3>
            <h5>(1 Child) 2000/hr NTD</h5>
            <h5>(2 Children) 3000/hr NTD</h5>
          </div>
          <div className={formStyles.twomode}>
            <h3 className={formStyles.twomodeheader}>Adult</h3>
            <h5>(1 Adult) 3000/hr NTD</h5>
          </div>
        </div>
        <div>

          <h4>
            {language === 'en' ? '**Note: Some children may be more suitable for "Focused Learning"' : ''}
          </h4>
        </div>
      </section>
      {/* <div className={utilStyles.space}></div> */}
      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>
          {language === 'en' ? 'What will I Learn ?' : '我會學到什麼 ?'} </h1>
        <h4>
          {language === 'en' ? 'In-person demonstrations, practicing, corrections graphics are intende as a general idea of what may be covered' : '面對面方式, 盡可能涵蓋一般概念的示範、練習、修正嘴型'}
        </h4>
        <div>
          <div className={utilStyles.fiveinline}>
            <img
              src="/images/accent e.svg"
              className={utilStyles.imagesmall}
            />
            <h4>{language === 'en' ? `"rrr" sound` : `"rrr"音`}</h4>
            <img
              src="/images/accent f.svg"
              className={utilStyles.imagesmall}
            />
            <h4>{language === 'en' ? `native  Asian speaker's "L" sound` : `母語為亞洲語言的人的"L"音`}</h4>
            <img
              src="/images/accent g.svg"
              className={utilStyles.imagesmall}
            />
            <h4>{language === 'en' ? `native English speaker's "L sound"` : `母語為英語的人的"L"音`}</h4>
          </div>
          <div className={utilStyles.fiveinline}>
            <h4 className={utilStyles.headingLg}>TONGUE POSITION</h4>
            <object
              data="/svg/accent h animated.svg"
              className={utilStyles.imagesmall}
            />

          </div>
        </div>
        <div className={utilStyles.flexc}>
          <div className={utilStyles.three}>
            <h4>{language === 'en' ? 'JAW POSITION' : '下巴位置'}</h4>
            <img
              src="/images/accent i.svg"
            />
          </div>
          <div className={utilStyles.three}>
            <h4>{language === 'en' ? 'LIP POSITION' : '嘴唇位置'}</h4>
            <img
              src="/images/accent j.svg"
            />
          </div>
          <div className={utilStyles.three}>
            <h4>{language === 'en' ? 'PRESSURE / SPEED' : '壓力/語速'}</h4>
            <img
              src="/images/accent k.svg"
            />
          </div>
        </div>

        <div>
          <h4>{language === 'en' ? 'SPEAKING STYLES' : '說話風格'} </h4>
          <div className={utilStyles.fiveinline}>
            <img
              src="/images/accent l.svg"
              className={utilStyles.imagesmall}
            />
            <p>{language === 'en' ? 'Casual' : '隨興'}</p>
          </div>
          <div className={utilStyles.fiveinline}>
            <img
              src="/images/accent m.svg"
              className={utilStyles.imagesmall}
            />
            <p>{language === 'en' ? 'Formal' : '正式'} </p>
          </div>
        </div>
        <div className={utilStyles.flexccc}>
          <h3>{language === 'en' ? 'SPEAKING RHYTHMS' : '說話的節奏'}</h3>
          <div className={`${utilStyles.textMd} ${utilStyles.textbox}`}>
            <p>{language === 'en' ? ' - Reading Aloud' : ' - 閱讀朗讀'}</p>
            <p>{language === 'en' ? ' - Candid Thought/Response' : ' - 直覺的想法/回應'}</p>
            <p>{language === 'en' ? ' - Prepared Speech' : ' - 演講準備'}</p>
          </div>
        </div>
      </section>

      {/* <div className={utilStyles.space}></div> */}
      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>
          {language === 'en' ? 'Custom ?' : '客製化 ?'} </h1>
        <p>{language === 'en' ? ` - Understand Client's Purpose and Goals` : '- 理解客戶的目的和目標'}</p>
        <div className={`${utilStyles.textMd} ${utilStyles.textbox} ${utilStyles.flexc}`}>
          <div className={utilStyles.threeinline}>
            <p className={utilStyles.pbold}>{language === 'en' ? 'Business' : '商用'}</p>
            <p>{language === 'en' ? 'small business' : '小型企業'}</p>
            <p>{language === 'en' ? 'international conference' : '國際會議'}</p>
            <p>{language === 'en' ? 'industry-specific' : '行業特定'}</p>
          </div>
          <div className={utilStyles.threeinline}>
            <p className={utilStyles.pbold}>{language === 'en' ? 'Leisure' : '休閒'}</p>
            <p>{language === 'en' ? 'making friends' : '交朋友'}</p>
            <p>{language === 'en' ? 'travel' : '旅遊'}</p>
            <p>{language === 'en' ? 'lifestyle content creator' : '生活方式內容創作者'}</p>
          </div>
          <div className={utilStyles.threeinline}>
            <p className={utilStyles.pbold}>{language === 'en' ? 'Eductional' : '教育性質'}</p>
            <p>{language === 'en' ? 'school' : '學校'}</p>
            <p>{language === 'en' ? 'overseas student' : '留學生'}</p>
            <p>{language === 'en' ? 'graduate research' : '研究生研究'}</p>
          </div>
        </div>
        <div className={utilStyles.flexccc}>
          <div className={`${utilStyles.textMd} ${utilStyles.textbox}`}>
            <p>{language === 'en' ? ` - Run through speaking all sound of American English` : ' - 以美式英語口音進行朗讀練習'}</p>
            <p>{language === 'en' ? ` - Analyze hearing sensitivity` : ' - 分析聽覺敏感度'}</p>
            <p>{language === 'en' ? ` - Results for specifics of individual sound tuning` : ' - 分析個別聲音調整的具體結果'}</p>
            <p>{language === 'en' ? ` - Personalized list of sentences / vocabulary to exercise` : ' - 提供個人化的句子/詞彙練習清單'}</p>
          </div>
        </div>
        <div>
          <p className={utilStyles.pbold}>{language === 'en' ? `shortened Example of Results` : ''}</p>
          <img
            src="/images/accent n.svg"
            className={utilStyles.imagesmall}
          />
        </div>

      </section>

      {/* <div className={utilStyles.space}></div> */}
      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>
          {language === 'en' ? 'Reality Sessions' : '實戰演練'}
        </h1>

        <h4>{language === 'en' ? `Real World Practice, if suitable, solidifies the learning experience. This is the glue to take what‘s been learned and then put into action.
      Live analysis and self-recording have been proven to make massive impact.` : '如果可以適當的在真實世界中實踐，能夠使學習體驗更加深入。把所學的東西付諸實踐是關鍵。實時的分析和自我記錄已證實能夠產生巨大的影響'}</h4>
      
        <object
          data="/svg/accent o animated.svg"
          className={utilStyles.imagesmall} 
        />
  
      </section>

      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>
          {language === 'en' ? 'FAQ' : 'FAQ'}
        </h1>
        <div className={`${utilStyles.textMd} ${utilStyles.textbox}`}>
          <div className={formStyles.faqcontanier}>
            <div className={formStyles.question} >
              <p>{language === 'en' ? '1. Do I need to prepare anything beforehand?' : '1.上課前需要準備什麼?'}</p>

              {q1option
                ? <img src='/icon/up_icon.png' onClick={() => setQ1option(false)}></img>
                : <img src='/icon/down_icon.png' onClick={() => setQ1option(true)}></img>
              }
            </div>
            {q1option &&
              <div className={formStyles.answer}>
                {language === 'en' ?
                  <p>Please make sure to send your <span className={formStyles.inlinelink} ><Link href="/new">sample recording</Link></span> before your session.</p> : <p>請先到 <span className={formStyles.inlinelink} ><Link href="/new">測試</Link></span> 錄下您的口說錄音</p>}
              </div>
            }
          </div>
          <div className={formStyles.faqcontanier}>
            <div className={formStyles.question}>
              <p>{language === 'en' ? '2. How do I sign up?' : '2.怎麼預約課程?'}</p>
              {q2option
                ? <img src='/icon/up_icon.png' onClick={() => setQ2option(false)}></img>
                : <img src='/icon/down_icon.png' onClick={() => setQ2option(true)}></img>
              }
            </div>
            {q2option &&
              <div className={formStyles.answer}>
                {language === 'en' ?
                  <p><span className={formStyles.inlinelink} ><Link href="/booking">Book Here</Link></span>, 100% Refundable over 48 hours before session</p> : <p> 在這裡 <span className={formStyles.inlinelink} ><Link href="/booking">預約</Link></span>, 在開始前48小時前取消免費退款</p>}
              </div>
            }
          </div>
          <div className={formStyles.faqcontanier}>
            <div className={formStyles.question}>
              {language === 'en' ? '3. Where is the class located?' : '3.我們會在哪裡上課?'}
              {q3option
                ? <img src='/icon/up_icon.png' onClick={() => setQ3option(false)}></img>
                : <img src='/icon/down_icon.png' onClick={() => setQ3option(true)}></img>
              }
            </div>
            {q3option &&
              <div className={formStyles.answer}>{language === 'en' ? 'Indoor community area 5 minute walk from Jiantan MRT station' : '安排在室內開放空間, 距離劍潭捷運站走路約5分鐘'}</div>
            }
          </div>
          <div className={formStyles.faqcontanier}>
            <div className={formStyles.question}>
              {language === 'en' ? "4. How do I know if I'm improving?" : '4.我怎麼持續進步？'}
              {q4option
                ? <img src='/icon/up_icon.png' onClick={() => setQ4option(false)}></img>
                : <img src='/icon/down_icon.png' onClick={() => setQ4option(true)}></img>
              }
            </div>
            {q4option &&
              <div className={formStyles.answer}>{language === 'en' ? "Recordings from each class + homework assignments will be proof of progress." : '在課堂上您可以錄音, 課後完成指派的回家作業'}</div>
            }
          </div>
          <div className={formStyles.faqcontanier}>
            <div className={formStyles.question}>
              {language === 'en' ? "5. I know it's an accent class, but is it also an English language class?" : '5.我知道這是美式口音課程, 但這也是英文課？'}
              {q5option
                ? <img src='/icon/up_icon.png' onClick={() => setQ5option(false)}></img>
                : <img src='/icon/down_icon.png' onClick={() => setQ5option(true)}></img>
              }
            </div>
            {q5option &&
              <div className={formStyles.answer}>{language === 'en' ? 'No. You will most certainly be introduced to new vocabulary and inevitably be taught how to use them, but this is not designed to be an English course. If you want, you may also sign up for customized English classes for learning if deemed eligible.  Your American accent coach does not speak Chinese.' : '不是。你肯定會接觸到一些新詞彙，不能避免老師會教您如何使用它們，但本課程並不是設計為一堂英語課程。如果有意願也符合資格的話，也跟我們報名專門客制的英語課程。美式口語老師在課堂上不會使用中文。'}</div>
            }
          </div>
        </div>
      </section>

      <section className={utilStyles.headingMd}>
        <div className={utilStyles.flexccc}>
          <button className={formStyles.button} type="submit" onClick={handleSubmit}>預約課程</button>

        </div>
      </section>
    </Layout >
  )
}

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }
