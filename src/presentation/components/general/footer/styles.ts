import { styled } from '@/presentation/styles/theme'

export const Container = styled('div', {
  display: 'flex',
  height: '6rem',
  backgroundColor: '$text',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem 0',
  gap: '1rem',

  '@xsm': {
    height: '4.5rem',
    padding: '0 1rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  '@lg': {
    padding: '0 10rem'
  },

  '@xlg': {
    padding: '0 20rem'
  }
})

export const CreatedBy = styled('div', {
  fontSize: '1rem',
  color: '$background',

  a: {
    fontWeight: 700,
    textDecoration: 'underline'
  }
})

export const ContactContainer = styled('div', {
  display: 'flex',
  gap: '1rem',

  '@xsm': {
    padding: '1rem'
  }
})
