import { createContext, useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const LeafletContext = createContext();

export const LeafletConsumer = LeafletContext.Consumer;

export const LeafletProvider = function LeafletProvider({ children }) {
  const [map, setMap] = useState(null);

  const value = useMemo(() => ({ map, setMap }), [map]);
  return <LeafletContext.Provider value={value}>{children}</LeafletContext.Provider>;
};

LeafletProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export function useLeafletContext() {
  const context = useContext(LeafletContext);

  if (!context) {
    throw new Error('useLeafletContext must be used within a LeafletProvider');
  }
  return context;
}
