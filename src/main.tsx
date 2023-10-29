import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme.ts'
import './index.css'
import '@mantine/core/styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <MantineProvider theme={theme}>
         <App />
      </MantineProvider>
   </React.StrictMode>
)
