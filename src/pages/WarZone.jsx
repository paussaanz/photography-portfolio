import React from 'react';
import SuperButton from './SuperButton';

const WarZone = () => {
  return (
    <div>
      <div>
        <h1>WarZone</h1>
        <section style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <SuperButton
            link="https://www.google.com"
          >
            asdasd
          </SuperButton >
        </section>
      </div>
    </div>
  );
};

export default WarZone;
