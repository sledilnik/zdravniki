/* eslint-disable react/prop-types */

import React from 'react';
import styles from './Card.module.css';

/**
 * Card component renders children wrapped in a div or article.
 *
 * @param {Object} props - The properties object.
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the card.
 * @param {React.ComponentProps<"article">["className"]} props.className - The class name for the card. Defaults to an empty string.
 * @param {React.ReactNode} props.children - The children to be rendered inside the card.
 * @param {"div" | "article"} props.as - The element type to wrap the card content. Defaults to "article".
 * @returns {JSX.Element} The rendered Card component.
 */
const Card = function Card({ id = undefined, className = '', children, as = 'div' }) {
  const Wrapper = as;

  return (
    <Wrapper id={id} className={`${styles.Card} ${className}`}>
      {children}
    </Wrapper>
  );
};

export default Card;
