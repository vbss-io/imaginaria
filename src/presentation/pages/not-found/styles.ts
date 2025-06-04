import { styled } from '@/presentation/styles/theme'

export const Container = styled('div', {
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',

  '&::before': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1
  }
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  padding: '2rem'
})

export const NotFoundText = styled('h1', {
  fontSize: '2.5rem',
  fontWeight: '600',
  color: 'white',
  margin: 0
})

export const NotFound404 = styled('h2', {
  fontSize: '8rem',
  fontWeight: '700',
  color: 'white',
  margin: 0,
  lineHeight: 1,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
})

export const NotFound404Text = styled('p', {
  fontSize: '1.5rem',
  color: 'white',
  margin: 0,
  opacity: 0.9
})
