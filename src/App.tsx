import React, { useEffect, useRef } from 'react';
import './style/app.css';

function App() {
  const refGuidePage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const guidePage = refGuidePage.current;
    guidePage?.classList.add('show');
  },[]);
  return (
    <div ref={refGuidePage} className='app guide-page' style={{fontSize:'.2rem'}}>
      <img src={require('./images/emart_logo_icon_@2x.png')} alt='logo' className='logo' />
      <h1 className='title'>Emart</h1>
      <img src={require('./images/slogan@2x.png')} alt='slogan' className='slogan' />
      <img src={require('./images/next_step_icon_@2x.png')} alt='next' className='next' />
    </div>
  );
}

export default App;
