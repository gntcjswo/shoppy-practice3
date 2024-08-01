import React, { useEffect, useRef, useState } from 'react';
import styles from './Ellipsis.module.scss';

export default function Ellipsis() {
  const ref = useRef<any>();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [refWidth, setRefWidth] = useState<any>();

  useEffect(() => {
    if (ref.current) {
      setRefWidth(ref.current.offsetWidth);
      console.log('refWidth:', refWidth, ' / innerWidth:', innerWidth, ' / innerWidth - 60:', innerWidth - 60);
    }
  }, [ref.current]);

  const resizeListener = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return (
    <div className={`sampleClass ${refWidth > innerWidth - 50 ? styles.ellipsis : styles.inherit}`}>
      <span ref={ref} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        ankjd akbj dkbdsfsdfa aasf sdf s sssd fsd adssd f sfsdffsdankjd akbj dkbdsfsdfa aasf sdf s sssd fsd adssd f sfsdffsdankjd akbj dkbdsfsdfa aasf sdf s sssd fsd adssd f sfsdffsdankjd akbj
      </span>
      <a href='#'>더보기</a>
    </div>
  );
}
