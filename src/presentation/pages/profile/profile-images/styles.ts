import { styled } from '@/presentation/styles/theme'

export const Container = styled('div', {
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  maxWidth: '1200px',
  margin: '0 auto',
  gap: '1rem'
})

export const Content = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  padding: '4.5rem 2rem',

  '.galleryContent': {
    width: '100%'
  }
})
