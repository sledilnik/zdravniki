/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from 'react';

import { cva, cx } from 'class-variance-authority';

import styles from './card.module.css';

/**
 * @typedef {"div" | "article"} CardAs
 * @typedef {"div" | "header"} CardHeaderAs
 * @typedef {"span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h5" | "h6"} CardTitleAs
 * @typedef {"title" | "subtitle"} CardTitleVariant
 */

/**
 * Card component
 * A container component that supports dynamic HTML elements via the `as` prop.
 *
 * @type {React.ForwardRefRenderFunction<
 *   HTMLDivElement,
 *   React.ComponentPropsWithRef<T> & {
 *     as?: T = "article";
 *   }
 * >}
 * @template {CardAs} T
 */
export const Card = forwardRef(({ as: Wrapper = 'div', className, ...props }, ref) => (
  <Wrapper ref={ref} className={cx(styles.Card, className)} {...props} />
));

Card.displayName = 'Card';

/**
 * CardHeader component
 * A header component that supports dynamic HTML elements via the `as` prop.
 *
 * @type {React.ForwardRefRenderFunction<
 *   HTMLElement,
 *   React.ComponentPropsWithRef<Z> & {
 *     as?: Z = "header";
 *   }
 * >}
 * @template {CardHeaderAs} Z
 */
export const Header = forwardRef(({ as: Wrapper = 'header', className, ...props }, ref) => (
  <Wrapper ref={ref} className={cx(styles.Header, className)} {...props} />
));

Header.displayName = 'Header';

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
 *   React.ComponentPropsWithRef<Y> & {
 *     as?: Y = "span";
 *     variant?: CardTitleVariant;
 *   }
 * >}
 * @template {CardTitleAs} Y
 */
export const Title = forwardRef(
  ({ as: Wrapper = 'span', variant = 'title', className, ...props }, ref) => (
    <Wrapper ref={ref} className={titleVariants({ variant, className })} {...props} />
  ),
);

Title.displayName = 'Title';

export default {
  Card,
  Header,
  Title,
};
