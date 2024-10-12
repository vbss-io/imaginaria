
import { Link } from "react-router-dom";

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

export const MasonryItem = styled(Link, {
  overflowY: 'hidden',
  display: 'flex',
  width: '100%',
  paddingBottom: '1rem',

  img: {
    borderRadius: '0.5rem'
  }
});
