import { createStitches, createTheme } from '@stitches/react'

const basicColors = {
  black: 'hsl(0, 0%, 0%)',
  white: 'hsl(0, 0%, 100%)',
  gray: 'hsl(0, 0%, 50%)',
  red: 'hsl(0, 100%, 50%)',
  green: 'hsl(120, 100%, 50%)'
}

export const { styled, keyframes, theme, globalCss } = createStitches({
  theme: {
    colors: {
      ...basicColors,
      primary: 'hsl(155, 63%, 30%)',
      secondary: 'hsl(140, 50%, 21%)',
      highlight: 'hsl(148, 66%, 67%)',
      text: 'hsl(230, 15%, 15%)',
      background: 'hsl(0, 0%, 98%)'
    }
  },
  media: {
    xsm: '(min-width: 480px)',
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xlg: '(min-width: 1280px)'
  }
})

export const darkTheme = createTheme({
  colors: {
    ...basicColors,
    primary: 'hsl(155, 63%, 40%)',
    secondary: 'hsl(140, 50%, 31%)',
    highlight: 'hsl(148, 66%, 77%)',
    text: 'hsl(0, 0%, 95%)',
    background: 'hsl(230, 15%, 15%)'
  }
})
