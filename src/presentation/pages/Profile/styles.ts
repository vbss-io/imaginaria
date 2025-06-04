import { styled } from '@/presentation/styles/theme'

export const Container = styled('div', {
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  maxWidth: '1200px',
  margin: '0 auto'
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
})

export const AvatarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center'
})

export const AvatarWrapper = styled('div', {
  position: 'relative',
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  overflow: 'hidden',
  cursor: 'pointer',

  '&:hover': {
    '&::after': {
      content: 'Alterar foto',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '0.875rem'
    }
  },

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
})

export const Label = styled('label', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  zIndex: 1
})

export const Input = styled('input', {
  display: 'none'
})

export const ErrorMessage = styled('p', {
  color: '$error',
  fontSize: '0.875rem',
  textAlign: 'center'
})

export const ActionsContainer = styled('div', {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1rem'
})

export const LoadingContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export const DialogContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem'
})

export const Divider = styled('div', {
  height: '1px',
  width: '50%',
  minWidth: '180px',
  backgroundColor: '$primary'
})
