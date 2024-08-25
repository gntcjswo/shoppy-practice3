import React from 'react';
import styles from './Intro.module.scss';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';

export default function Intro() {
  return (
    <div className={styles.introWrap}>
      <div className={styles.inbox}>
        <div className={styles.motion}>
          <DotLottieReact src='/path/publish.json' loop autoplay />
        </div>
        <div className={styles.txt}>
          <div>
            <strong>Publish</strong>
            <p>
              2015.03~2024.03까지 근무한 퍼블리셔 포트폴리오입니다.
              <br />
              UI/UX에 대해 이해하고 있는 만큼 프론트엔드 개발에 강점이 될 수 있을 것입니다.
            </p>
          </div>
        </div>
        <a href='http://base-css.woobi.co.kr/' target='_blank' rel='noopener noreferrer'>
          사이트 바로가기
        </a>
      </div>
      <div className={styles.inbox}>
        <div className={styles.motion}>
          <DotLottieReact src='/path/frontend.json' loop autoplay />
        </div>
        <div className={styles.txt}>
          <div>
            <strong>Front-end</strong>
            <p>
              리액트, 타입스크립트로 작업한 프론트엔드 포트폴리오입니다.
              <br />
              공부한 내용을 바탕으로 응용하여 제작했습니다.
            </p>
          </div>
        </div>
        <a href='/home' target='_blank' rel='noopener'>
          사이트 바로가기
        </a>
      </div>
    </div>
  );
}
