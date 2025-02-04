import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/ui/theme-provider.tsx'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'react-hot-toast'
import { Provider } from "react-redux";
import { store } from './redux/Store.ts'

createRoot(document.getElementById('root')!).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <BrowserRouter>
           <Provider store={store}>
              <App />
             <Toaster/>
           </Provider>
       </BrowserRouter>
    </ThemeProvider>
)
