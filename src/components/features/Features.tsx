import React, { useRef, useState } from 'react';
import styles from './Features.module.scss';
import FeaturesItem from './FeaturesItem';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Features() {
  const [tl, setTl] = useState<gsap.core.Timeline>();
  const [tlFixed, setTlFixed] = useState<gsap.core.Timeline>();
  const containerWrap = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const carousel = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let tl = gsap.timeline({
      // defaults: {
      //   immediateRender: false,
      // },
      scrollTrigger: {
        trigger: containerWrap.current,
        start: '30% 0%',
        end: '+=200%',
        scrub: 0.5,
        // toggleActions: 'restart play play reverse',
        markers: true,
        id: 'tl',
      },
    });

    let tlFixed = gsap.timeline({
      // defaults: {
      //   immediateRender: false,
      // },
      scrollTrigger: {
        trigger: containerWrap.current,
        start: 'top 0%',
        end: '+=260%',
        pin: true,
        toggleActions: 'restart play play reverse',
        // markers: { startColor: 'orange', endColor: 'orange', fontSize: '20px' },
        id: 'tlFixed',
      },
    });

    setTl(tl);
    setTlFixed(tlFixed);
  });

  useGSAP(
    () => {
      tl &&
        tl.fromTo(
          carousel.current,
          {
            rotateY: '0deg',
          },
          {
            rotateY: '-160deg',
          }
        );
    },
    { dependencies: [tl] }
  );

  useGSAP(
    () => {
      tlFixed &&
        tlFixed.fromTo(
          containerWrap.current,
          {
            background: '#fff',
          },
          {
            background: '#e51550',
          }
        );
    },
    { dependencies: [tlFixed] }
  );

  return (
    <div className={styles.featuresWrap} ref={containerWrap}>
      <div className={styles.features} ref={container}>
        <div className={styles.scene_set}>
          <div className={styles.carousel_set} ref={carousel}>
            <FeaturesItem img='slick' text='텍스트' refDiv={{ tl, tlFixed, containerWrap, container, carousel }} />
            <FeaturesItem img='slick' text='텍스트' refDiv={{ tl, tlFixed, containerWrap, container, carousel }} />
            <FeaturesItem img='slick' text='텍스트' refDiv={{ tl, tlFixed, containerWrap, container, carousel }} />
            <FeaturesItem img='slick' text='텍스트' refDiv={{ tl, tlFixed, containerWrap, container, carousel }} />
            <FeaturesItem img='slick' text='텍스트' refDiv={{ tl, tlFixed, containerWrap, container, carousel }} />
          </div>
        </div>
      </div>
    </div>
  );
}
