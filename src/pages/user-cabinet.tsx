import React from 'react';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserCabinet: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{t('userCabinet')}</h3>
          <p className="card-text">{t('welcomeUserCabinet')}</p>
          <button className="btn btn-primary">{t('manageProfile')}</button>
          <button className="btn btn-secondary ms-2">{t('viewOrders')}</button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
});

export default UserCabinet;