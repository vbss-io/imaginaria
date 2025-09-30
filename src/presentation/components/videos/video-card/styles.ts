import { keyframes, styled } from '@/presentation/styles/theme'

export const blink = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.2 }
})

export const Container = styled('div', {
  width: '100%',
  display: 'flex',
  position: 'relative',
  marginBottom: '1rem !important',
  transition: 'transform 0.1s ease-in-out',

  '&:hover': {
    transform: 'scale(1.01)'
  },

  video: {
    borderRadius: '0.5rem'
  }
})

export const VideoCardPreview = styled('div', {
  width: '100%',
  display: 'flex',
  overflow: 'hidden',
  position: 'relative'
})

export const PlayIconWrapper = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: '0.75rem !important',
  padding: '0.5rem',
  borderRadius: '2rem',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  width: '2rem',
  height: '2rem',

  svg: {
    width: '100%',
    height: '100%',
    color: 'white'
  },

  variants: {
    isLoading: {
      true: {
        svg: {
          animation: `${blink} 1.5s infinite ease-in-out`
        }
      }
    }
  }
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
