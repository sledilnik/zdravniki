/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

import { Suspense, useRef } from 'react';
import useFirstViewportEntry from 'hooks/useFirstViewportEntry';

/**
 * Component that renders its children only when it enters the viewport.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children to render when the component enters the viewport.
 * @param {IntersectionObserverEntryInit} [props.intersectionObserverInit] - The options for the IntersectionObserver.
 * @param {React.ComponentProps<'div'>["className"]} [props.divProps] - The props to pass to the wrapping <div></div>
 * @param {React.ComponentProps<'div'>} [props.divProps] - The props to pass to the wrapping <div></div>
 * @returns {JSX.Element} The rendered component.
 */
const RenderOnViewportEntry = function RenderOnViewportEntry({
  children,
  intersectionObserverInit = { threshold: 0, root: null, rootMargin: '0px' },
  srOnlyComponentsBeforeEntered,
  className,
  ...divProps
}) {
  const { threshold = 0, root = null, rootMargin = '0px' } = intersectionObserverInit;
  const ref = useRef(null);
  const hasEntered = useFirstViewportEntry(ref, { threshold, root, rootMargin });

  return (
    <div ref={ref} className={className} {...divProps}>
      {!hasEntered ? srOnlyComponentsBeforeEntered : null}
      {hasEntered ? <Suspense fallback={<div>Loading....</div>}>{children}</Suspense> : null}
    </div>
  );
};

export default RenderOnViewportEntry;
