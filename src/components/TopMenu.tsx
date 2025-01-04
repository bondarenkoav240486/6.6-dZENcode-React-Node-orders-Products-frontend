import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const TopMenu = () => {
  // const [activeSessions, setActiveSessions] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
  //   const socket = io('http://localhost:3001');
  //   socket.on('activeSessions', (data: number) => setActiveSessions(data));

    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      // socket.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <span>{currentTime.toLocaleString()}</span>
      {/* <span>Active Sessions: {activeSessions}</span> */}
      TopMenu
    </div>
  );
};

export default TopMenu;
