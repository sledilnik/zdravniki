/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { forwardRef } from 'react';

import styles from '../Card.module.css';

/**
 * CardHeader component
 *
 * @type React.ForwardRefRenderFunction<HTMLDivElement, React.ComponentPropsWithRef<'header'>>
 */
export const CardHeader = forwardRef((props, ref) => {
  const { children, className } = props;
  return (
    <header ref={ref} className={`${styles.CardHeader} ${className || ''}`} {...props}>
      {children}
    </header>
  );
});

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle component
 *
 * @type React.ForwardRefRenderFunction<HTMLSpanElement, React.ComponentPropsWithRef<'span'>>
 */
export const CardTitle = forwardRef((props, ref) => {
  const { children, className } = props;

  if (!children) throw new Error('Missing CardTitle children');

  return (
    <span ref={ref} className={`${styles.CardTitle} ${className || ''}`} {...props}>
      {children}
    </span>
  );
});

CardTitle.displayName = 'CardTitle';

/**
 * CardSubtitle component
 *
 * @type React.ForwardRefRenderFunction<HTMLSpanElement, React.ComponentPropsWithRef<'span'>>
 */
export const CardSubtitle = forwardRef((props, ref) => {
  const { children, className } = props;

  if (!children) return null;

  return (
    <span ref={ref} className={`${styles.CardSubtitle} ${className || ''}`} {...props}>
      {children}
    </span>
  );
});

CardSubtitle.displayName = 'CardSubtitle';
