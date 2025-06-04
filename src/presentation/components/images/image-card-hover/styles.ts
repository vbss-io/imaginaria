import { styled } from '@/presentation/styles/theme'

export const HoverOverlay = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent, transparent, rgba(0, 0, 0, 0.5))',
  zIndex: 0,
  pointerEvents: 'none',
  borderRadius: '0.5rem'
})

export const ImageHoverTop = styled('div', {
  top: 0,
  position: 'absolute',
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
  padding: '0.75rem',
  zIndex: 1,
  pointerEvents: 'none',

  '.button': {
    pointerEvents: 'auto',
    maxWidth: '2.5rem',
    height: '2.5rem'
  }
})

export const ImageHoverBottom = styled('div', {
  bottom: 0,
  width: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.75rem',
  zIndex: 1,
  pointerEvents: 'none',

  strong: {
    color: 'white !important'
  },

  '.button': {
    pointerEvents: 'auto',
    maxWidth: '2.5rem',
    height: '2.5rem'
  }
})

export const AvatarContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
})

export const AvatarInfo = styled('div', {
  display: 'flex',
  color: '$text',
  flexDirection: 'column',

  strong: {
    fontSize: '1.2rem',
    fontWeight: 500
  },

  span: {
    lineHeight: '1.2rem',
    opacity: 0.5
  }
})
