import React from 'react';
import styles from './Technology.module.scss';
import TechnologyItem from './TechnologyItem';
import { title } from 'process';
import { techProps } from './TechnologyItem';

export default function Technology() {
  const techList: techProps[] = [
    { img: 'react', title: 'REACT', content: 'REACT로 만든 포트폴리오입니다.' },
    { img: 'typescript', title: 'Typescript', content: 'Typescript를 적용했습니다.' },
    { img: 'jest', title: 'Jest', content: '테스트 코드를 작성했습니다.' },
    { img: 'gsap', title: 'GSAP', content: '인터렉션을 위해 REACT에서의 gsap를 적용해 보았습니다.' },
    { img: 'storybook', title: 'Storybook', content: 'Storybook을 통해 UI 컴포넌트를 문서화했습니다.' },
    { img: 'firebase', title: 'Firebase', content: 'Firebase의 Authentication과 Realtime Database를 사용해서 로그인 후 포..오를 등록할 수 있도록 했습니다.' },
    { img: 'cloudinary', title: 'Cloudinary', content: 'Cloudinary를 통해 포..오의 이미지를 업로드합니다.' },
    { img: 'sass', title: 'SASS', content: 'SASS(SCSS)를 사용했습니다.' },
  ];

  return (
    <div className={styles.technology}>
      {techList.map((item, index) => (
        <TechnologyItem img={item.img} title={item.title} content={item.content} key={index} />
      ))}
    </div>
  );
}
