import React from 'react';
import { t } from 'i18next';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';

/**
 * Error boundary higher-order component for unhandled errors
 * @example
 * export default withErrorBoundary(App)
 */
export const withErrorBoundary = WrappedComponent =>
  function renderComponent({ ...props }) {
    return (
      <ErrorBoundaryWrapper>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <WrappedComponent {...props} />
      </ErrorBoundaryWrapper>
    );
  };

const FallbackComponent = function FallbackComponent() {
  return <div>{t('error.title')}</div>;
};

/**
 * Error boundary component for unhandled errors
 * @example
 * <ErrorBoundaryWrapper><App /></ErrorBoundaryWrapper>
 */
const ErrorBoundaryWrapper = function ErrorBoundaryWrapper({ children }) {
  return <ErrorBoundary fallbackRender={FallbackComponent}>{children}</ErrorBoundary>;
};

ErrorBoundaryWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundaryWrapper;
