import React from 'react';
import styles from './NotFound.module.scss';

export default function NotFound() {
  return (
    <div className={styles.notfound}>
      <h2>페이지를 찾을 수 없습니다.</h2>
      <figure>
        <img src='/img/img_404_not_found.gif' alt='404 Not Found' />
      </figure>
    </div>
  );
}
