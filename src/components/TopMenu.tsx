import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';


const TopMenu: React.FC = () => {
   const [activeSessions, setActiveSessions] = useState<number>(0);
   const [currentTime, setCurrentTime] = useState<Date | null>(null);
   const { t } = useTranslation('common');

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');
         socket.on('activeSessions', (data: number) => {
            console.log('Received activeSessions:', data);
            setActiveSessions(data);
         });
         console.log('TopMenu mounted');
         const interval = setInterval(() => setCurrentTime(new Date()), 1000);
         return () => {
            socket.disconnect();
            clearInterval(interval);
         };
      }
   }, []);

   return (
      <div className="d-flex justify-content-between py-2">
         {currentTime && <span>{currentTime.toLocaleString()}</span>}
         <span>{t('activeSessions')}: {activeSessions}</span>
      </div>
   );
};

export default TopMenu;