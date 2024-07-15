import React from 'react';
import styles from './MainBanner.module.scss';
import { Link } from 'react-router-dom';
import Slick from './slider/Slick';
import classNames from 'classnames';

interface ItemProps {
  img: string;
  title: string;
  link: string;
}

const items: ItemProps[] = [
  {
    img: '/img/bg_main_banner_02.jpg',
    title: 'Youtube Clone',
    link: '/products',
  },
  {
    img: '/img/bg_main_banner_03.jpg',
    title: 'Shopping Mall',
    link: '/products',
  },
  {
    img: '/img/bg_main_banner_01.jpg',
    title: 'Todo List',
    link: '/products',
  },
];

export default function MainBanner() {
  return (
    <Slick className={styles.mainBanner}>
      {items.map((item, index) => (
        <div className={classNames(styles.item, `item${index.toString().length < 2 ? `0${index + 1}` : index + 1}`)} key={index}>
          <div className={styles.bg} style={{ backgroundImage: `url(${item.img})` }}></div>
          <div className={styles.inner}>
            <h2>
              <small>REACT 실습 포트폴리오</small>
              {item.title}
            </h2>
            <div className={styles.link}>
              <Link to={item.link}>자세히보기</Link>
            </div>
          </div>
        </div>
      ))}
    </Slick>
  );
}
