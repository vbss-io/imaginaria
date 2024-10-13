import { createStitches, createTheme } from '@stitches/react';

export const {
  styled,
  keyframes,
  theme,
  globalCss,
} = createStitches({
  theme: {
    fonts: {
      default: "Arial"
    },
    colors: {
      background: '#FFFFFF',
      text: '#000000',
      primary: '#473D8A',
      secondary: '#6A5BCD',
      highlight: '#552087'
    },
  },
  media: {
    xsm: '(min-width: 480px)',
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xlg: '(min-width: 1280px)',
  }
});

export const darkTheme = createTheme({
  colors: {
    background: '#151B23',
    text: '#FFFFFF',
    primary: '#473D8A',
    secondary: '#6A5BCD',
    highlight: '#552087'
  },
});

export const Root = styled('div', {
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignContent: 'center',
  flexDirection: 'column',
  fontFamily: 'Arial',
  backgroundColor: '$background'
});
