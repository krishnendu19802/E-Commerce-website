import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Redux/store.jsx'
import { Auth0Provider } from '@auth0/auth0-react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider Auth0Provider
      domain="dev-iqwru20rkedr41ml.us.auth0.com"
      clientId="a7zOAS5HkKokYjGxI8vuuxqY9TOnzU70"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Provider store={store}>

        <App />
      </Provider>
    </Auth0Provider >
  </React.StrictMode>,
)
