import { useContext } from 'react'

import { TabContext } from '@/presentation/contexts/tab-context'

export const useTab = () => {
  return useContext(TabContext)
}
