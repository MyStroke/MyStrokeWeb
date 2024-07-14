import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId); // Cleanup interval on component unmount
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  return (
    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
      {formattedTime}
    </div>
  );
};

export default Clock;
