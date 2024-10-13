import { Dialog } from "vbss-ui";

import { styled } from "@/presentation/config/stitches.config";

export const Container = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  overflowX: 'hidden',
});

export const MasonryWrapper = styled('div', {
  overflowY: 'hidden',
  width: '95%',
  columnCount: 2,

  '@sm': {
    width: '90%',
    columnCount: 3,
  },

  '@md': {
    columnCount: 4,
  },

  '@lg': {
    width: '80%',
    columnCount: 5,
  }
});

export const ImageDialog = styled(Dialog, {
  backgroundColor: '$background',
  color: '$text',
  maxHeight: '95vh',
  maxWidth: '90vw',

  h2: {
    color: '$background'
  }
})
