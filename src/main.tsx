import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import App from './App.tsx'
import UserProvider from './contexts/user.context.tsx'

import './index.css'
import CategoriesProvider from './contexts/categories.context.tsx'
import CartProvider from './contexts/cart.context.tsx' 
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
    </Provider>
   </StrictMode>
)
