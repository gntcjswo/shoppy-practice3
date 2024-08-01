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

  useGSAP(
    () => {
      console.log('render');

      timeline &&
        timeline.from(
          el.current,
          {
            y: 100,
            alpha: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: container.current,
              start: 'top center',
              markers: true,
            },
          },
          index && index * 0.1
        );
    },
    { dependencies: [timeline, index], scope: container && container.current }
  );

  return (
    <>
      {container && (
        <div className={classNames(styles.technologyItem, className)} ref={el}>
          <div className={styles.simple}>
            <figure>
              <img src={`/img/${img}.png`} alt={title} />
            </figure>
            <p>{title}</p>
          </div>
          {/* <div className={styles.detail}>{content}</div> */}
        </div>
      )}
    </>
  );
}
