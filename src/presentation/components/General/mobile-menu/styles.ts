import { styled } from '@/presentation/styles/theme'

export const Container = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.95)',
  backdropFilter: 'blur(10px)',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
})

export const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem',
  width: '100%'
})

export const Logo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: 'white',
  fontSize: '1.25rem',
  fontWeight: 'bold',

  img: {
    height: '50px'
  }
})

export const Content = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  padding: '0 1rem',
  maxWidth: '400px',
  width: '100%',
  margin: '0 auto',

  '.button': {
    width: '200px'
  }
})

export const Divider = styled('div', {
  height: '1px',
  width: '50%',
  minWidth: '180px',
  backgroundColor: '$primary'
})
