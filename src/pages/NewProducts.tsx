import React, { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import styles from './NewProducts.module.scss';
import { uploadImage } from 'api/uploader';
import { Button } from 'components/ui/buttons/Button';
import { useNavigate } from 'react-router-dom';
import { addNewPortfolio } from 'api/firebase';

export type Portfolio = {
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
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  // const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);

      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [files]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const { files } = e.target as HTMLInputElement;

    if (name === 'file' && files) {
      setFiles(files);
      return;
    }

    setPortfolio((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);

    if (!files || files.length === 0) {
      setError('이미지를 선택해 주세요.');
      setIsUploading(false);
      return;
    }

    try {
      const uploadPromises = Array.from(files).map((file) => uploadImage(file)); // 각 파일을 업로드
      const uploadedUrls = await Promise.all(uploadPromises); // 모든 파일 업로드 완료 대기

      // 업로드된 이미지 URL을 이용해 포트폴리오 데이터 저장
      await addNewPortfolio(portfolio, uploadedUrls);

      alert('포트폴리오가 등록되었습니다.');
      navigate('/portfolio');
    } catch (err) {
      console.error(err);
      setError('업로드 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsUploading(false);
    }

    // uploadImage(file)
    //   .then((url) => {
    //     console.log(url);
    //     addNewPortfolio(portfolio, url).then(() => {
    //       alert('프트폴리오가 등록되었습니다.');
    //       navigate('/portfolio');
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setError('업로드 중 오류가 발생했습니다. 다시 시도해 주세요.');
    //   })
    //   .finally(() => setIsUploading(false));
  };

  return (
    <div className={styles.portfolioForm}>
      <h2>포트폴리오 등록</h2>

      {error && <p className={styles.error}>{error}</p>}
      {previewUrls.map((url, index) => (
        <img key={index} src={url} alt={`local file ${index}`} />
      ))}
      {/* {previewUrl && <img src={previewUrl} alt='local file' />} */}
      <form onSubmit={handleSubmit}>
        <input type='file' accept='image/*' name='file' multiple required onChange={handleChange} />
        <input type='text' name='title' value={portfolio.title ?? ''} placeholder='프로젝트명' required onChange={handleChange} />
        <textarea name='description' value={portfolio.description ?? ''} placeholder='프로젝트 설명' required onChange={handleChange}></textarea>
        <input type='text' name='link' value={portfolio.link ?? ''} placeholder='링크' required onChange={handleChange} />
        <Button theme='strong' text={isUploading ? '업로드 중...' : '등록하기'} type='submit' disabled={isUploading} />
      </form>
    </div>
  );
}
