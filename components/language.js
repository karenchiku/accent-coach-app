import  languagesytle  from './language.module.css';
import utilStyles from '../styles/utils.module.css'

export function LanguageOption({ language, setLanguage }){

        return(
            <div className={utilStyles.headingMd}>
                <div className={languagesytle.languagecontrainer}>
                <div className={language === 'en' ? languagesytle.selectedtext : languagesytle.buttontext} onClick={() => setLanguage('en')}>EN</div>
                <div> | </div> 
                <div className={language === 'zh' ? languagesytle.selectedtext : languagesytle.buttontext} onClick={() => setLanguage('zh')}>CH</div>
                
                </div>
            </div>

        )
}