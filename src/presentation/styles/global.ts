import { globalCss } from '@/presentation/styles/theme'

export const globalStyles = globalCss({
  'html, body, #root': {
    '--primary': 'var(--theme-primary)',
    '--secondary': 'var(--theme-secondary)',
    '--highlight': 'var(--theme-highlight)',
    '--text': 'var(--theme-text)',
    '--background': 'var(--theme-background)',
    margin: 0,
    padding: 0,
    backgroundColor: '$background',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
  },

  ':root': {
    '--theme-primary': '155, 63%, 30%',
    '--theme-secondary': '140, 50%, 21%',
    '--theme-highlight': '148, 66%, 67%',
    '--theme-text': '230, 15%, 15%',
    '--theme-background': '0, 0%, 98%'
  },

  '[data-theme="dark"]': {
    '--theme-primary': '155, 63%, 40%',
    '--theme-secondary': '140, 50%, 31%',
    '--theme-highlight': '148, 66%, 77%',
    '--theme-text': '0, 0%, 95%',
    '--theme-background': '230, 15%, 15%'
  },

  '&::-webkit-scrollbar': {
    width: '0.3rem',
    height: '0.3rem'
  },

  '::-webkit-scrollbar-track': {
    backgroundColor: '$background'
  },

  '::-webkit-scrollbar-thumb': {
    backgroundColor: '$primary',
    borderRadius: '20rem',

    '&:hover': {
      backgroundColor: '$secondary',
      borderRadius: '20rem',
      cursor: 'grab'
    }
  }
})
