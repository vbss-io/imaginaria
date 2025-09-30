import { styled } from '@/presentation/styles/theme'

export const FormContainer = styled('div', {
  width: '100%',
  maxWidth: '1200px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  margin: '0 auto',
  marginTop: '8px',

  '@media (max-width: 1200px)': {
    padding: '0 2rem'
  }
})

export const Form = styled('form', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
})

export const FormContentContainer = styled('div', {
  width: '100%',
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',

  variants: {
    first: {
      true: {
        flexDirection: 'row',
        '& > div:first-child': {
          flex: 1,
          minWidth: '200px'
        }
      }
    }
  }
})

export const SelectWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',

  '& > svg': {
    position: 'absolute',
    right: '1rem',
    color: '$gray500',
    pointerEvents: 'none'
  }
})

export const Select = styled('select', {
  width: '100%',
  height: '2.5rem',
  padding: '0 2.5rem 0 1rem',
  borderRadius: '20rem',
  border: '1px solid $gray300',
  backgroundColor: 'white',
  color: '$gray900',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'all 0.2s',
  appearance: 'none',

  '&:focus': {
    borderColor: '$primary500',
    boxShadow: '0 0 0 2px $primary100'
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed'
  },

  '& option': {
    backgroundColor: 'white',
    color: '$gray900'
  }
})

export const SortOptionsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '0.5rem',
  minWidth: '200px',
  alignItems: 'center'
})

export const SortOptionButton = styled('button', {
  all: 'unset',
  width: '90%',
  padding: '0.5rem 1rem',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  transition: 'all 0.2s',
  backgroundColor: '$primary',
  textAlign: 'center',

  '&:hover': {
    backgroundColor: '$secondary'
  },

  '&.active': {
    backgroundColor: '$secondary',
    color: 'white'
  }
})

export const SortOptionContent = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: '0.5rem'
})

export const SortOptionLabel = styled('span', {
  fontSize: '0.875rem',
  fontWeight: '500'
})

export const SortDirection = styled('span', {
  fontSize: '1rem',
  fontWeight: '600',
  color: 'inherit'
})
