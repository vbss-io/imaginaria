import { keyframes, styled } from '@/presentation/styles/theme'

export const zoomOutAnimation = keyframes({
  from: {
    transformOrigin: 'var(--lastTransformOrigin)'
  },
  to: {
    transformOrigin: 'center center'
  }
})

export const Container = styled('div', {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  cursor: 'zoom-in',
  position: 'relative',

  img: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    transition: 'transform 0.5s ease-in-out'
  },

  '&.zoomed': {
    cursor: 'zoom-out',
    img: {
      transform: 'scale(2.5)'
    }
  }
})
