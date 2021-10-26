import { createContext, useState, useContext } from 'react';

const LeafletContext = createContext();

export const LeafletConsumer = LeafletContext.Consumer;

export function LeafletProvider({ children }) {
  const [map, setMap] = useState(null);

  return <LeafletContext.Provider value={{ map, setMap }}>{children}</LeafletContext.Provider>;
}

export function useLeafletContext() {
  const context = useContext(LeafletContext);

  if (!context) {
    throw new Error('useLeafletContext must be used within a LeafletProvider');
  }
  return context;
}
