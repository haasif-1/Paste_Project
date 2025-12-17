import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <App />
    </Provider>
  </BrowserRouter>
);

