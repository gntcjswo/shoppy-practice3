import React, { useRef, useState } from 'react';
import styles from './Github.module.scss';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Github() {
  const container = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const txt = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLAnchorElement>(null);
  const [tl, setTl] = useState<gsap.core.Timeline>();

  useGSAP(() => {
    let tlGithub = gsap.timeline({
      defaults: {
        duration: 1,
      },
      scrollTrigger: {
        trigger: container.current,
        start: 'top 20%',
        // end: 'top 80%',
        toggleActions: 'restart play play reverse',
        markers: true,
        id: 'github',
      },
    });

    setTl(tlGithub);
  });

  useGSAP(
    () => {
      tl &&
        tl
          .to(bg.current, {
            skewY: -10,
            background: '#f4f4f4',
            boxShadow: '17px 17px -10px rgba(0, 0, 0, 0.2)',
          })
          .fromTo(
            txt.current,
            {
              y: 50,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
            },
            '-=1'
          )
          .fromTo(
            btn.current,
            {
              position: 'fixed',
              width: '3.75rem',
              height: '3.75rem',
              borderRadius: '1.875rem',
              fontSize: '1rem',
              background: '#ddd',
              color: '#000',
            },
            {
              width: '25rem',
              height: '5rem',
              borderRadius: '1.25rem',
              fontSize: '2rem',
              background: '#e51550',
              color: '#fff',
            },
            '-=1'
          );
    },
    { dependencies: [tl] }
  );

  return (
    <div className={styles.githubWrap} ref={container}>
      <div className={styles.githubBg} ref={bg}></div>
      <div className={styles.githubInner}>
        <h3 className={styles.githubTxtbox} ref={txt}>
          소스코드는 GitHub에 올려두었습니다.
        </h3>
        <Link className={styles.githubBtn} to='http://naver.com' target='_blank' rel='noopener noreferrer' ref={btn}>
          GitHub
        </Link>
      </div>
    </div>
  );
}
