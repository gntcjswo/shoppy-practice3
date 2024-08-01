import React, { useRef, useState } from 'react';
import styles from './Technology.module.scss';
import TechnologyItem from './TechnologyItem';
import { techProps } from './TechnologyItem';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Technology() {
  const [tl, setTl] = useState<gsap.core.Timeline>();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let tl = gsap.timeline({
      // defaults: {
      //   immediateRender: false,
      // },
      scrollTrigger: {
        trigger: container.current,
        start: 'top center',
        end: 'top topr',
        markers: true,
      },
    });
    setTl(tl);
  });

  const techList: techProps[] = [
    { className: 'techItem1', img: 'react', title: 'REACT', content: 'REACT로 만든 포트폴리오입니다.', timeline: tl, index: 0 },
    { className: 'techItem2', img: 'typescript', title: 'Typescript', content: 'Typescript를 적용했습니다.', timeline: tl, index: 1 },
    { className: 'techItem3', img: 'jest', title: 'Jest', content: '테스트 코드를 작성했습니다.', timeline: tl, index: 2 },
    { className: 'techItem4', img: 'gsap', title: 'GSAP', content: '인터렉션을 위해 REACT에서의 gsap를 적용해 보았습니다.', timeline: tl, index: 3 },
    { className: 'techItem5', img: 'storybook', title: 'Storybook', content: 'Storybook을 통해 UI 컴포넌트를 문서화했습니다.', timeline: tl, index: 4 },
    {
      className: 'techItem6',
      img: 'firebase',
      title: 'Firebase',
      content: 'Firebase의 Authentication과 Realtime Database를 사용해서 로그인 후 포..오를 등록할 수 있도록 했습니다.',
      timeline: tl,
      index: 5,
    },
    { className: 'techItem7', img: 'cloudinary', title: 'Cloudinary', content: 'Cloudinary를 통해 포..오의 이미지를 업로드합니다.', timeline: tl, index: 6 },
    { className: 'techItem8', img: 'sass', title: 'SASS', content: 'SASS(SCSS)를 사용했습니다.', timeline: tl, index: 7 },
  ];

  return (
    <div className={styles.technology} ref={container} style={{ height: '2000px' }}>
      {techList.map((item, index) => (
        <TechnologyItem className={item.className} img={item.img} title={item.title} content={item.content} timeline={item.timeline} index={item.index} container={container} key={index} />
      ))}
    </div>
  );
}
