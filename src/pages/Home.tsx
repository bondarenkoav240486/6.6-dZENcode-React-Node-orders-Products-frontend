import React from 'react';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">{t('welcomeTitle')}</h1>
        <p className="lead">{t('welcomeDescription')}</p>
        <hr className="my-4" />
        <ul className="list-group">
          <li className="list-group-item">React</li>
          <li className="list-group-item">Next.js</li>
          <li className="list-group-item">TypeScript</li>
          <li className="list-group-item">Redux Toolkit</li>
          <li className="list-group-item">CSS Frameworks: Bootstrap</li>
          <li className="list-group-item">REST (Axios/Fetch)</li>
          <li className="list-group-item">Node.js</li>
          <li className="list-group-item">Express</li>
          <li className="list-group-item">Sequelize</li>
          <li className="list-group-item">MongoDB</li>
          <li className="list-group-item">WebSocket (WS)</li>
          <li className="list-group-item">Git</li>
          <li className="list-group-item">Docker</li>
          <li className="list-group-item">Azure</li>
          <li className="list-group-item">Form (Validation)</li>
          <li className="list-group-item">i18next</li>
          <li className="list-group-item">JWT</li>
          <li className="list-group-item">Web Storage</li>
          <li className="list-group-item">Lazy Loading</li>
          <li className="list-group-item">Charts</li>
          <li className="list-group-item">{t('andMore')}</li>
        </ul>
        <p className="mt-4">{t('exploreMessage')}</p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
});

export default Home;