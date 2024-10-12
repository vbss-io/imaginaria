import { styled } from "@/presentation/config/stitches.config";

export const Container = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const TabsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  flexDirection: 'column',
  alignItems: 'center',
  button: {
    width: '10rem',
  },

  '@xsm': {
    flexDirection: 'row',
    button: {
      width: 'unset',
    }
  },

  '@sm': {
    flexDirection: 'row',
    button: {
      minWidth: '10rem',
    }
  }
})

export const PageTitle = styled('h1', {
  color: '$text',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  display: 'flex',
})

export const Content = styled('div', {
  width: '100%',
  gap: '1rem',
  display: 'flex',
  justifyContent: 'center',
})
