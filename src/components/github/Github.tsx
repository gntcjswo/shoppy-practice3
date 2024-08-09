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

  useGSAP(
    () => {
      let tl = gsap
        .timeline({
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
        })
        .to(bg.current, {
          skewY: -10,
          background: '#f4f4f4',
          boxShadow: '17px 17px -10px rgba(0, 0, 0, 0.2)',
        })
        .from(
          txt.current,
          {
            y: 50,
            autoAlpha: 0,
          },
          '-=1'
        )
        .from(
          btn.current,
          {
            position: 'fixed',
            right: '1.25rem',
            bottom: '1.25rem',
            width: '3.75rem',
            height: '3.75rem',
            borderRadius: '1.875rem',
            fontSize: '1.125rem',
            background: '#ddd',
            color: 'black',
          },
          '-=1'
        );

      setTl(tl);
    },
    { dependencies: [tl], scope: container.current }
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
