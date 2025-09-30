import { keyframes, styled } from '@/presentation/styles/theme'

export const blink = keyframes({
  '0%': { opacity: 0.4 },
  '50%': { opacity: 1 },
  '100%': { opacity: 0.4 }
})

export const Container = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: '1rem',
  backgroundColor: 'hsl(var(--theme-background))',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  video: {
    width: '100%',
    height: '100%',
    borderRadius: '1rem'
  },

  variants: {
    fit: {
      cover: {
        video: {
          objectFit: 'cover'
        }
      },
      contain: {
        video: {
          objectFit: 'contain'
        }
      }
    }
  },

  defaultVariants: {
    fit: 'cover'
  }
})

export const PlayIconWrapper = styled('div', {
  position: 'absolute',
  top: '0.5rem',
  left: '0.5rem',
  margin: '0.5rem',
  padding: '0.5rem',
  borderRadius: '2rem',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  width: '2rem',
  height: '2rem',
  zIndex: 1,

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
