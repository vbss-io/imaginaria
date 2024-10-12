import App from '@/App.tsx'
import { globalCss } from '@/presentation/config/stitches.config'
import React from 'react'
import ReactDOM from 'react-dom/client'
import "vbss-ui/dist/style.css"
import { registerDependencies } from './infra/dependency-injection/Register'

registerDependencies()

const globalStyles = globalCss({
  html: {
    backgroundColor: "$background",
  },

  body: {
    unset: 'all',
    margin: 0,
    padding: 0,
    border: 0,
    fontFamily: "$default",

    '::-webkit-scrollbar': {
      width: '0.25rem'
    },
  
    '::-webkit-scrollbar-track': {
      backgroundColor: '#E5E7EB',
      borderRadius: '1rem'
    },
  
    '::-webkit-scrollbar-thumb': {
      backgroundColor: '$primary',
      borderRadius: '1rem',

      '&:hover': {
        backgroundColor: '$highlight',
      },

      '&:active': {
        backgroundColor: '$highlight',
      },
    },
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {globalStyles()}
    <App />
  </React.StrictMode>,
)
