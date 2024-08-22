import React, { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import styles from './ModifyProducts.module.scss';
import { uploadImage } from 'api/uploader';
import { Button } from 'components/ui/buttons/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import useProducts from 'hooks/useProducts';
import { Portfolio } from './NewProducts';

export default function ModifyProducts() {
  const {
    state: {
      portfolio: { id, image, title, description, link },
    },
  } = useLocation();
  const [portfolio, setPortfolio] = useState<Portfolio>({
    title,
    description,
    link,
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  // const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>(image);

  const { updatePortfolio } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);

      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [files]);

  // 새 파일 선택 시 기존 파일을 비우고 새로 추가
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const { files } = e.target as HTMLInputElement;

    if (name === 'file' && files) {
      setFiles(files); // 기존 파일을 비우고 새 파일로 교체
      const fileUrls = Array.from(files).map((file: File) => URL.createObjectURL(file));
      setPreviewUrls(fileUrls);

      return () => fileUrls.forEach((url: string) => URL.revokeObjectURL(url)); // 메모리 누수 방지
    }

    setPortfolio((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);

    // if (!files || files.length === 0) {
    //   setError('이미지를 선택해 주세요.');
    //   setIsUploading(false);
    //   return;
    // }

    try {
      let uploadedUrls: string[] = [];

      if (files && files.length > 0) {
        // 새로 선택된 파일이 있으면 업로드
        const uploadPromises = Array.from(files).map((file) => uploadImage(file));
        uploadedUrls = await Promise.all(uploadPromises);
      } else {
        // 새 파일이 없으면 기존 이미지를 그대로 사용
        uploadedUrls = image;
      }

      // 포트폴리오 데이터 저장
      updatePortfolio.mutate(
        { portfolio, urls: uploadedUrls, id },
        {
          onSuccess: () => {
            alert('포트폴리오가 등록되었습니다.');
            navigate('/portfolio');
          },
          onError: (err) => {
            console.error(err);
            setError('업로드 중 오류가 발생했습니다. 다시 시도해 주세요.');
          },
          onSettled: () => {
            // 성공 여부와 관계없이 최종적으로 실행되는 코드
            setIsUploading(false);
          },
        }
      );
    } catch (err) {
      console.error(err);
      setError('업로드 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className={styles.portfolioForm}>
      <h2>포트폴리오 수정</h2>

      {error && <p className={styles.error}>{error}</p>}
      {previewUrls.map((url, index) => (
        <img key={index} src={url} alt={`local file ${index}`} />
      ))}
      {/* {previewUrl && <img src={previewUrl} alt='local file' />} */}
      <form onSubmit={handleSubmit}>
        <input type='file' accept='image/*' name='file' multiple onChange={handleChange} />
        <input type='text' name='title' value={portfolio.title ?? ''} placeholder='프로젝트명' required onChange={handleChange} />
        <textarea name='description' value={portfolio.description ?? ''} placeholder='프로젝트 설명' required onChange={handleChange}></textarea>
        <input type='text' name='link' value={portfolio.link ?? ''} placeholder='링크' required onChange={handleChange} />
        <Button theme='strong' text={isUploading ? '업로드 중...' : '등록하기'} type='submit' disabled={isUploading} />
      </form>
    </div>
  );
}
