import React, { useRef } from 'react';
import styles from './FeaturesItem.module.scss';
import { useGSAP } from '@gsap/react';

type FeaturesItemProps = {
  img: string;
  text: string;
  refDiv: any;
};

export default function FeaturesItem({ img, text, refDiv }: FeaturesItemProps) {
  const { tl, tlFixed, containerWrap, container, carousel } = refDiv;

  return (
    <div className={styles.itemWrap}>
      <div className={styles.itemInner}>{text}</div>
    </div>
  );
}
