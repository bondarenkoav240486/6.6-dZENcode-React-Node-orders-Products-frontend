import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LanguageSwitcher: FC = () => {
   
   const router = useRouter();
   const [hydrated, setHydrated] = useState(false);
   const { i18n } = useTranslation();
   const { t } = useTranslation('common');

   useEffect(() => {
      setHydrated(true); // This will be executed only on the client side
   }, []);

   const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng);
      router.push(router.pathname, router.asPath, { locale: lng });
   };

   return (
      <div className="d-flex justify-content-center my-3">
         <button
            className={`btn mx-2 ${hydrated? i18n.language === 'en' ? 'btn-primary' : 'btn-outline-primary' : ''}`}
            onClick={() => changeLanguage('en')}
         >
            {t('English')}
            {/* {hydrated && t('English')} */}
         </button>
         <button
            className={`btn mx-2 ${hydrated ? i18n.language === 'uk' ? 'btn-primary' : 'btn-outline-secondary' : ''}`}
            onClick={() => changeLanguage('uk')}
         >
            {t('Ukrainian')}
            {/* {hydrated && t('Ukrainian')} */}
         </button>
      </div>
   );
};


export default LanguageSwitcher;