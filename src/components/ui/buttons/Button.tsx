import classNames from 'classnames';
import React, { forwardRef } from 'react';
import styles from './Button.module.scss';
import { ButtonBase, ButtonBaseProps, LinkButtonBaseProps, LinkButtonBase } from './ButtonBase';

export const Themes = ['strong', 'conversion', 'default'] as const;
export type Theme = (typeof Themes)[number];

export const Icons = ['login'] as const;
export type Icon = (typeof Icons)[number];

export const IconPosition = ['left', 'right'] as const;
export type IconPosition = (typeof IconPosition)[number];

export type ButtonProps = ButtonBaseProps & {
  /** 버튼 컬러 테마 */
  theme?: Theme;
  icon?: Icon;
  iconPosition?: IconPosition;
};

export type LinkButtonProps = LinkButtonBaseProps & {
  /** 버튼 컬러 테마 */
  theme?: Theme;
  icon?: Icon;
};

/**
 * Button Component.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, theme = 'default', icon, iconPosition = `left`, ...props }, ref) => {
  return <ButtonBase ref={ref} className={classNames(styles.button, styles.prefixIcon, className)} data-theme={theme} data-icon={icon} icon-position={iconPosition} {...props} />;
});
Button.displayName = 'Button';

/**
 * Link Button Component.
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(({ className, theme = 'default', icon, ...props }, ref) => {
  return <LinkButtonBase ref={ref} className={classNames(styles.button, styles.prefixIcon, className)} data-theme={theme} data-icon={icon} {...props} />;
});
LinkButton.displayName = 'LinkButton';
