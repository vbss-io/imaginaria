import { styled } from '@/presentation/styles/theme'

export const Container = styled('div', {
  width: '100%',
  flex: 1,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '80px',
  minHeight: '100vh',

  '&::before': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})

export const Content = styled('div', {
  position: 'relative',
  zIndex: 1,
  maxWidth: '1200px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  color: 'white',
  gap: '2rem',
  padding: '2rem 1rem',

  '@md': {
    padding: '4rem 2rem'
  }
})

export const Logo = styled('div', {
  width: '300px',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1rem',

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },

  '@md': {
    width: '400px',
    height: '120px'
  }
})

export const Description = styled('p', {
  fontSize: '1.25rem',
  maxWidth: '600px',
  lineHeight: 1.6,
  opacity: 0.9,

  '@md': {
    fontSize: '1.5rem'
  }
})

export const Features = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '2rem',
  width: '100%',
  maxWidth: '1000px',
  marginTop: '2rem',

  '@md': {
    gridTemplateColumns: 'repeat(2, 1fr)'
  }
})

export const Feature = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '2rem',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '1rem',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',

  '&:hover': {
    transform: 'translateY(-5px)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderColor: '$primary',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
  }
})

export const FeatureTitle = styled('h3', {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '$primary',
  marginBottom: '0.5rem'
})

export const FeatureDescription = styled('p', {
  fontSize: '1.1rem',
  color: 'rgba(255, 255, 255, 0.9)',
  lineHeight: 1.6
})
