import { Link } from "react-router-dom";

import { styled } from "@/presentation/config/stitches.config";

export const Container = styled('div', {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '25rem',
  minHeight: '20rem',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

export const Title = styled('h1', {
  fontWeight: 700,
  color: 'white',
  zIndex: 1,
  fontSize: '2rem',

  '@xsm': {
    fontSize: '3rem',
  },

  '@sm': {
    fontSize: '4rem',
  }
});

export const ImageInfo = styled(Link, {
  position: 'absolute',
  bottom: 0,
  right: 0,
  padding: '1rem',
  fontSize: '0.75rem',
  color: 'white',
  zIndex: 1,
  cursor: 'pointer',
  
  span: {
    fontWeight: 700,
  }
});

export const BlackOverlay = styled('div', {
  position: 'absolute',
  backgroundColor: 'black',
  width: '100%',
  height: '100%',
  opacity: 0.5
});