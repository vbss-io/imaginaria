import { styled } from '@/presentation/styles/theme'

export const Container = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center'
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 25rem)',
  width: '95%',

  '@sm': {
    width: '90%'
  },

  '@lg': {
    width: '80%'
  },

  '.masonry-grid': {
    display: 'flex',
    width: 'auto'
  },

  '.masonry-grid-column': {
    backgroundClip: 'padding-box',
    padding: '0.5rem',

    button: {
      width: '100%'
    },

    div: {
      margin: 0
    }
  }
})

export const NoData = styled('div', {
  width: '100%',
  height: 'calc(100vh - 25rem)',
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.5rem',
  lineHeight: '1.5rem',
  fontWeight: 'bold',
  color: '$primary'
})
