import { Link } from 'react-router-dom';
import { Dialog } from 'vbss-ui';

import { styled } from '@/presentation/config/stitches.config';

export const Container = styled('div', {
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  zIndex: 1,
});

export const ContainerBlackOverlay = styled(Link, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  backgroundColor: 'black',
  opacity: '0.2'
})

export const Modal = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '$background',
  borderRadius: '1rem',
  color: 'white',
  margin: '2rem',
  zIndex: 1,

  svg: {
    color: '$primary'
  },

  '@xsm': {
    alignSelf: 'unset',
    justifySelf: 'unset',
  }
});

export const ModalHeader = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',

  a: {
    padding: '1rem',
  }
})

export const ModalContent = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'fit-content',
  width: 'fit-content',
  maxWidth: '100%',
  maxHeight: '50%',

  img: {
    height: '100%',
    width: '100%'
  },

  '@sm': {
    maxHeight: '70%',
  },

  '@md': {
    height: 'fit-content',
    width: 'fit-content',
    maxHeight: '80%',
    maxWidth: '100%',
  }
})

export const DetailsDialog = styled(Dialog, {
  backgroundColor: '$background !important',

  h2: {
    color: '$text'
  },

  p: {
    color: '$text'
  }
})

export const DetailsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
})

export const DetailsHeader = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  padding: '1rem',
  backgroundColor: '$primary',
  borderRadius: '1rem',
  flexDirection: 'column',

  '@sm': {
    flexDirection: 'row',
  },

  img: {
    height: '10rem',
    borderRadius: '1rem'
  },
})

export const DetailsHeaderInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  color: '$background',
  gap: '1rem'
})

export const DetailsHeaderInfoCard = styled('div', {
  minWidth: '30%',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  
  span: {
    opacity: 0.5
  }
})

export const DetailsContent = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',

  strong: {
    fontWeight: 500
  },

  span: {
    fontWeight: 600,
  },

  variants: {
    column: {
      true: {
        flexDirection: 'column',

        strong: {
          fontSize: '0.8rem'
        }
      }
    }
  }
})

export const ModalFooter = styled('div', {
  width: '100%',
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  
  '@md': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export const ModalFooterButtons = styled('div', {
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',

  '@md': {
    flexDirection: 'row',
  }
})
