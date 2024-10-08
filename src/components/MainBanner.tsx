import { useState } from 'react';
import styles from './MainBanner.module.scss';
import Slick from './slider/Slick';
import classNames from 'classnames';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from './ui/buttons/Button';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ItemProps {
  img: string;
  bg: string;
  title: string;
  link: string;
}

const items: ItemProps[] = [
  {
    img: '/img/img_monitor_02.png',
    bg: 'radial-gradient(circle, rgba(250,3,4,1) 0%, rgba(75,21,22,1) 68%, rgba(24,23,28,1) 100%)',
    title: 'Youtube Clone',
    link: '/portfolio/d27e4485-7549-4889-bdf5-7573e9944d10',
  },
  {
    img: '/img/img_monitor_03.png',
    bg: 'radial-gradient(circle, rgba(241,238,233,1) 0%, rgba(175,156,126,1) 63%, rgba(159,135,99,1) 100%)',
    title: 'Shopping Mall',
    link: '/portfolio/4c35c8af-5280-45a2-a957-4a16f02f4ead',
  },
  {
    img: '/img/img_monitor_01.png',
    bg: 'radial-gradient(circle, rgba(170,88,34,1) 0%, rgba(89,42,12,1) 69%, rgba(64,28,5,1) 98%)',
    title: 'Todo List',
    link: '/portfolio/11ad99a6-29f8-4b7f-a9ca-a3df7421b0c2',
  },
];

export default function MainBanner() {
  const [tl, setTl] = useState<gsap.core.Timeline>();
  const navigate = useNavigate();

  useGSAP(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#root',
        start: '0% 0%',
        endTrigger: '.monitorImg',
        end: '100% 0%',
        toggleActions: 'restart play play reverse',
        // markers: true,
        scrub: true,
        id: 'monitor',
      },
    });

    setTl(tl);
  });

  useGSAP(
    () => {
      tl &&
        tl.to('.monitorImg', {
          rotateX: '90deg',
        });
    },
    { dependencies: [tl] }
  );

  return (
    <Slick className={styles.mainBanner}>
      {items.map((item, index) => (
        <div className={classNames(styles.item, `item${index.toString().length < 2 ? `0${index + 1}` : index + 1}`)} key={index}>
          <div className={styles.bg} style={{ background: item.bg }}></div>
          <div className={styles.inner}>
            <h2>
              <small>REACT 실습 포트폴리오</small>
              {item.title}
            </h2>
            <div className={styles.link}>
              <Button theme='strong' size='m' onClick={() => navigate(`${item.link}`)} text='자세히보기' />
            </div>
          </div>
          <div className={styles.imgBox}>
            <figure className={`${styles.img} monitorImg`}>
              <img src={item.img} alt={item.title} />
            </figure>
          </div>
        </div>
      ))}
    </Slick>
  );
}
