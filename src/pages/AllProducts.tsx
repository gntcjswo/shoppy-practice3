import React from 'react';
import styles from './AllProducts.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/authContext';
import Products from 'components/Products';
import { Button } from 'components/ui/buttons/Button';

export default function AllProducts() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const portfolioAdd = () => {
    if (user && user.isAdmin) {
      navigate('/portfolio/new');
    }
  };
  return (
    <div>
      <div className={`inner ${styles.head}`}>
        <h2>Portfolio</h2>
        <Button
          theme='strong'
          size='s'
          onClick={portfolioAdd}
          text='포트폴리오 등록'
          disabled={user && user.isAdmin ? false : true}
          title={user && user.isAdmin ? '포트폴리오 등록하기' : '관리자 권한이 필요합니다.'}
        />
      </div>
      <div className={styles.body}>
        <Products />
      </div>
    </div>
  );
}
