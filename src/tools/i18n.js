import i18next from 'i18next';

i18next
  .init({
    interpolation: {

      escapeValue: false,
    },
    lng: 'fa' ,
   
    resources: {
      en: {
        translation: {
          
          loginWelcome:'Website Coming Soon',
          loginButtonText:'login',
          username:'username',
          password:'password',
          sendPhoneNumber:'Send Phone No',
          loginPhoneNumberEntry:' Leave your phone number and we"ll let you know once the site goes online.',
        },
      },
      fa: {
        translation: {
         
          loginWelcome:' به زودی با بهترین نرخ های پرواز با شما خواهیم بود ',
          loginButtonText:'ورود',
          username:'نام کاربری',
          password:'رمز عبور',
          sendPhoneNumber:'ارسال شماره تلفن',
          loginPhoneNumberEntry:' برای اطلاع از فعال شدن سایت شماره موبایل خود را وارد نمایید ',
          
        },
      },


    },
  })

export default i18next