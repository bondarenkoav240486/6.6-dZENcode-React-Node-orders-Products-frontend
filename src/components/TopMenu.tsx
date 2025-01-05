import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const TopMenu = () => {
  const [activeSessions, setActiveSessions] = useState(0);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const socket = io('http://localhost:3001');
      socket.on('activeSessions', (data: number) => setActiveSessions(data));

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
      <span>Active Sessions: {activeSessions}</span>
    </div>
  );
};

export default TopMenu;