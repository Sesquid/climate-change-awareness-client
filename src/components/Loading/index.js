import React from 'react';
import style from './style.module.css'

const Loading = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Loading...</h2>
      <div className={`${style.spinner}`}></div>
    </div>
  );
};

export default Loading;
