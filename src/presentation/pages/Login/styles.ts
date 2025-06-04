import { styled } from '@/presentation/styles/theme'

export const Container = styled('div', {
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
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
  width: '100%',
  maxWidth: '400px',
  position: 'relative',
  zIndex: 2
})

export const FormContainer = styled('div', {
  width: '100%',
  padding: '2rem',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(8px)'
})

export const Title = styled('h1', {
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '$primary',
  marginBottom: '1.5rem',
  textAlign: 'center'
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
})

export const FormSubmitContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginTop: '1rem',

  variants: {
    error: {
      true: {
        marginTop: '0.5rem'
      }
    }
  }
})

export const ErrorMessage = styled('p', {
  color: '$error',
  fontSize: '0.875rem'
})

export const LoadingContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})
