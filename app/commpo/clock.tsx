import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId); // Cleanup interval on component unmount
  }, []);

  const formattedTime = time.toLocaleTimeString('th-TH', { hour: 'numeric', minute: 'numeric' });

  return (
    <div style={{ fontSize: '40px', fontWeight: 'bold' }} className='flex items-center'>
      <div className="mr-3">
        {formattedTime <= '18:59' ? <FontAwesomeIcon icon={faSun} color='orange' /> : <FontAwesomeIcon icon={faMoon} color='yellow' />}
      </div>
      {formattedTime} น.
    </div>
  );
};

export default Clock;
