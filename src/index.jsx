import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'

import 'instantsearch.css/themes/algolia-min.css'
import './index.css'

import App from './App'

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App page="search" />,
  },
  {
    path: '/maps',
    element: <App page="maps" />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
