import { styled } from '@/presentation/styles/theme'

export const Sidebar = styled('nav', {
  width: '300px',
  minHeight: '100vh',
  padding: '5rem 1rem',
  flexDirection: 'column',
  backgroundColor: '$primary',
  gap: '1rem',
  display: 'none',

  '@md': {
    display: 'flex'
  }
})
