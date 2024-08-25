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
        // markers: true,
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
            background: 'linear-gradient(180deg, #ab0101, #000)',
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
            <FeaturesItem text={['Main Features']} />
            <FeaturesItem img='/img/img_main_features_01.jpg' text={['데이타베이스에 등록 한 포트폴리오 목록을 불러옵니다.', <br />, '관리자 권한이 있으면 포트폴리오 등록버튼이 활성화 됩니다.']} />
            <FeaturesItem img='/img/img_main_features_02.jpg' text={['포트폴리오를 데이타베이스에 등록합니다.', <br />, '관리자 권한이 없으면 해당 페이지에 접근할 수 없습니다.']} />
            <FeaturesItem img='/img/img_main_features_03.jpg' text={['포트폴리오의 상세내용을 불러옵니다.', <br />, '관리자 권한이 있으면 수정, 삭제 버튼이 활성화 됩니다.']} />
            <FeaturesItem img='/img/img_main_features_04.jpg' text={['데이타베이스에서 읽어온 값을 입력폼에 불러옵니다.', <br />, '이미지를 수정하지 않으면 기존의 이미지가 그대로 유지됩니다.']} />
          </div>
        </div>
      </div>
    </div>
  );
}
