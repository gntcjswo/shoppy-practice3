import React, { useRef } from 'react';
import styles from './Github.module.scss';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Github() {
  const container = useRef<HTMLDivElement>(null);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: container.current,
      start: 'top center',
      end: 'top top',
      toggleActions: 'restart play play reverse',
      markers: true,
      id: 'tl',
    },
  });

  return <div className={styles.githubWrap} ref={container}></div>;
}
