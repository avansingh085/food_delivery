import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/main_page.jsx'
import { createBrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider  store={store}>
    <App />
    </Provider>
  </StrictMode>
)
