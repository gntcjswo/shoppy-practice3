import styles from './FeaturesItem.module.scss';

type FeaturesItemProps = {
  img?: string;
  text: any[];
};

export default function FeaturesItem({ img, text }: FeaturesItemProps) {
  return (
    <div className={styles.itemWrap}>
      <div className={`${styles.itemInner} ${img ? '' : styles.noImg}`}>
        <figure className={styles.imgBox}>{img && <img src={img} alt='Main Features preview' />}</figure>
        <div className={styles.txtBox}>
          {text.map((txt, index) => (
            <p key={`features${index}`}>{txt}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
