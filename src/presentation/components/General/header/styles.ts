import { styled } from '@/presentation/styles/theme'

export const Container = styled('header', {
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 100,
  backgroundColor: 'transparent'
})

export const HeaderContent = styled('div', {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',

  '@md': {
    padding: '1rem 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    justifyContent: 'initial'
  }
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

export const HeaderButtons = styled('div', {
  display: 'none',
  gap: '1rem',
  justifyContent: 'center',

  '@md': {
    display: 'flex'
  }
})

export const Actions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  '@md': {
    justifyContent: 'flex-end'
  },

  '.mobile-menu': {
    display: 'block',
    '@md': {
      display: 'none'
    }
  }
})

export const UserButton = styled('div', {
  display: 'none',

  '@md': {
    display: 'block'
  }
})
