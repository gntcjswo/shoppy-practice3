import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { useHandleClick } from './Button.hooks';
import styles from './Button.module.scss';

type Merge<B extends object, S extends object> = S & Omit<B, keyof S>;
export type Size = 's' | 'm' | 'max';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

type BaseProps = {
  disabled?: boolean;
  /**
   * 버튼 크기
   */
  size?: Size;
};

export type ButtonBaseProps = Merge<BaseProps, ButtonProps>;
export type LinkButtonBaseProps = Merge<BaseProps, LinkProps>;

/**
 * 버튼의 기본 구성 요소
 */
export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(({ onClick, type = 'button', size = 'max', className, disabled, ...props }, ref) => {
  const handleClick = useHandleClick(onClick, disabled);
  return <button ref={ref} className={classNames(styles[`size-${size}`], className)} type={type} disabled={disabled} onClick={handleClick} {...props} />;
});

/**
 * 링크 버튼의 기본 구성 요소
 */
export const LinkButtonBase = forwardRef<HTMLAnchorElement, LinkButtonBaseProps>(({ size = 'max', className, disabled, onClick, ...props }, ref) => {
  const handleClick = useHandleClick(onClick, disabled);
  return <a ref={ref} role='button' onClick={handleClick} className={classNames(styles[`size-${size}`], className)} aria-disabled={disabled} {...props} />;
});
