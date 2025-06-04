import { styled } from '@/presentation/styles/theme'

export const Container = styled('div', {
  width: '100%',
  display: 'flex',
  position: 'relative',
  marginBottom: '1rem !important',
  transition: 'transform 0.1s ease-in-out',

  '&:hover': {
    transform: 'scale(1.01)'
  },

  img: {
    borderRadius: '0.5rem'
  }
})

export const ImageCardPreview = styled('div', {
  width: '100%',
  display: 'flex',
  overflow: 'hidden'
})

export const StatusIconContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  minHeight: '200px',
  backgroundColor: 'hsl(var(--theme-background))',
  borderRadius: '0.5rem',

  variants: {
    status: {
      queued: {
        color: 'gray'
      },
      error: {
        color: 'red'
      }
    }
  }
})

export const StatusContainer = styled('div', {
  position: 'absolute',
  padding: '1rem',

  variants: {
    status: {
      queued: {
        '.chip': {
          backgroundColor: 'gray',
          border: '1px solid gray'
        }
      },
      error: {
        '.chip': {
          backgroundColor: 'red',
          border: '1px solid red'
        }
      }
    }
  }
})
