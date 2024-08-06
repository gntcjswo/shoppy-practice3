import React, { useRef } from 'react';
import styles from './TechnologyItem.module.scss';
import classNames from 'classnames';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface techProps {
  className: string;
  img: string;
  title: string;
  content: string;
  timeline: any;
  index?: number;
  container?: any;
}

export default function TechnologyItem({ className, img, title, content, timeline, index, container }: techProps) {
  const el = useRef<HTMLDivElement>(null);
  const imgBox = useRef<HTMLDivElement>(null);
  const txtBox = useRef<HTMLDivElement>(null);
  let { tl, tlFixed, tlTxtBox, tlGray } = timeline;

  useGSAP(
    () => {
      tl &&
        tl.fromTo(
          imgBox.current,
          {
            y: 100,
            alpha: 0,
          },
          {
            y: 0,
            alpha: 1,
            duration: 0.5,
            // ease: 'power2.inOut',
          },
          index && index * 0.1
        );
    },
    { dependencies: [tl, index], scope: container && container.current }
  );

  useGSAP(
    () => {
      tlFixed &&
        tlFixed.to(
          imgBox.current,
          // {
          //   filter: 'grayscale(1)',
          //   scale: 0.8,
          // },
          {
            filter: 'grayscale(0)',
            scale: 1,
            duration: 0.5,
            stagger: 2,
          }
          // '+=4'
          // index && index * 4
        );
    },
    { dependencies: [tlFixed, index], scope: container && container.current }
  );

  useGSAP(
    () => {
      tlTxtBox &&
        tlTxtBox.fromTo(
          txtBox.current,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.5,
            stagger: 2,
          }
          // '+=4'
          // index && index * 4
        );
    },
    { dependencies: [tlTxtBox, index], scope: container && container.current }
  );

  useGSAP(
    () => {
      tlGray &&
        tlGray.fromTo(
          imgBox.current,
          {
            filter: 'grayscale(0)',
            scale: 1,
          },
          {
            filter: 'grayscale(1)',
            scale: 0.8,
            duration: 0.5,
            // ease: 'power2.in',
            // yoyo: true,
          },
          '-=0.5'
          // index && `-=${index} * 0.5`
        );
    },
    { dependencies: [tlGray], scope: container && container.current }
  );

  return (
    <>
      {container && (
        <div className={classNames(styles.technologyItem, className)} ref={el}>
          <div className={styles.simple}>
            <figure ref={imgBox}>
              <img src={`/img/${img}.png`} alt={title} />
            </figure>
            <div className={styles.txtBox} ref={txtBox}>
              <p>{title}</p>
              <div className={styles.detail}>{content}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
