import { styled } from '@/presentation/styles/theme'

export const Container = styled('div', {
  width: '100%',
  height: '200px',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  padding: '2rem'
})

export const ImageInfo = styled('a', {
  position: 'relative',
  zIndex: 2,
  color: 'white',
  fontSize: '0.875rem',
  textDecoration: 'none',
  opacity: 0.8,
  transition: 'opacity 0.2s',

  '&:hover': {
    opacity: 1
  },

  span: {
    fontWeight: 'bold'
  }
})

export const BlackOverlay = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 1
})
