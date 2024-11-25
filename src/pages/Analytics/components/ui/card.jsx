/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from 'react';

import { cva, cx } from 'class-variance-authority';

import styles from './card.module.css';

/**
 * @typedef {"div" | "article"} CardAs
 * @typedef {"div" | "header"} CardHeaderAs
 * @typedef {"span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h5" | "h6"} CardTitleAs
 *
 * @typedef {"div" | "figure" | "figcaption"} CardContentAs
 * @typedef {"title" | "subtitle"} CardTitleVariant
 *
 */

const cardVariants = cva(styles.Card, {
  variants: {
    padding: {
      none: styles.PaddingNone,
      small: styles.PaddingSmall,
      medium: styles.PaddingMedium,
      large: styles.PaddingLarge,
    },
  },
  defaultVariants: {
    padding: 'medium',
  },
});

/**
 * Card component
 * A container component that supports dynamic HTML elements via the `as` prop.
 *
 * @type {React.ForwardRefRenderFunction<
 *   HTMLDivElement,
 *   React.ComponentPropsWithRef<TCardAs> & {
 *     as?: TCardAs = "article";
 *   }
 * >}
 * @template {CardAs} TCardAs
 */
export const Card = forwardRef(({ as: Wrapper = 'div', className, padding, ...props }, ref) => (
  <Wrapper ref={ref} className={cardVariants({ padding, className })} {...props} />
));

Card.displayName = 'Card';

/**
 * CardHeader component
 * A header component that supports dynamic HTML elements via the `as` prop.
 *
 * @type {React.ForwardRefRenderFunction<
 *   HTMLElement<TCardHeaderAs>,
 *   React.ComponentPropsWithRef<TCardHeaderAs> & {
 *     as?: TCardHeaderAs = "header";
 *   }
 * >}
 * @template {CardHeaderAs} TCardHeaderAs
 */
export const CardHeader = forwardRef(({ as: Wrapper = 'header', className, ...props }, ref) => (
  <Wrapper ref={ref} className={cx(styles.Header, className)} {...props} />
));

CardHeader.displayName = 'CardHeader';

const titleVariants = cva('', {
  variants: {
    variant: {
      title: styles.Title,
      subtitle: styles.Subtitle,
    },
  },
  defaultVariants: {
    variant: 'title',
  },
});

/**
 * CardTitle component
 * A title component that supports dynamic HTML elements via the `as` prop.
 *
 * @type {React.ForwardRefRenderFunction<
 *   HTMLElement,
 *   React.ComponentPropsWithRef<TCardTitleAs> & {
 *     as?: TCardTitleAs = "span";
 *     variant?: CardTitleVariant;
 *   }
 * >}
 * @template {CardTitleAs} TCardTitleAs
 */
export const CardTitle = forwardRef(
  ({ as: Wrapper = 'span', variant = 'title', className, ...props }, ref) => (
    <Wrapper ref={ref} className={titleVariants({ variant, className })} {...props} />
  ),
);

CardTitle.displayName = 'CardTitle';

/**
 * CardContent component
 * A content component that supports dynamic HTML elements via the `as` prop.
 * @type {React.ForwardRefRenderFunction<
 *  HTMLElement,
 * React.ComponentPropsWithRef<HTMLDivElement> & {
 *  as?: TCardContentAs = "div";
 * }
 * >}
 *
 * @template {CardContentAs} TCardContentAs
 */
export const CardContent = forwardRef(({ as: Wrapper = 'div', className, ...props }, ref) => (
  <Wrapper ref={ref} className={cx(styles.Content, className)} {...props} />
));
