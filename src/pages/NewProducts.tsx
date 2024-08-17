import React, { FormEvent, ChangeEvent, useState } from 'react';
import styles from './NewProducts.module.scss';
import { uploadImage } from 'api/uploader';
import { Button } from 'components/ui/buttons/Button';
import { useNavigate } from 'react-router-dom';

type Portfolio = {
  title: string;
  description: string;
  link: string;
};

export default function NewProducts() {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    title: '',
    description: '',
    link: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  // const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'file' && files && files[0]) {
      setFile(files[0]);
      return;
    }

    setPortfolio((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        console.log(url);
        alert('프트폴리오가 등록되었습니다.');
        navigate('/portfolio');
        // setSuccess('성공적으로 제품이 추가되었습니다.');
        // setTimeout(() => {
        //   setSuccess(null);
        // }, 4000);
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <div className={styles.portfolioForm}>
      <h2>포트폴리오 등록</h2>
      {/* {success && <p>{success}</p>} */}
      {file && <img src={URL.createObjectURL(file)} alt='local file' />}
      <form onSubmit={handleSubmit}>
        <input type='file' accept='image/*' name='file' required onChange={handleChange} />
        <input type='text' name='title' value={portfolio.title ?? ''} placeholder='프로젝트명' required onChange={handleChange} />
        <input type='text' name='description' value={portfolio.description ?? ''} placeholder='프로젝트 설명' required onChange={handleChange} />
        <input type='text' name='link' value={portfolio.link ?? ''} placeholder='링크' required onChange={handleChange} />
        <Button theme='strong' text={isUploading ? '업로드 중...' : '등록하기'} type='submit' disabled={isUploading} />
      </form>
    </div>
  );
}
