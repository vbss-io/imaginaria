import { createContext, useState } from 'react';

type Tab = 'images' | 'videos' | 'audios'

export const TabContext = createContext({} as {
  tab: Tab
  setTab: (tab: Tab) => void;
});

interface TabProviderProps {
  children: React.ReactNode;
}

export const TabProvider = ({ children }: TabProviderProps) => {
  const [tab, setTab] = useState<Tab>('images');
  
  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
