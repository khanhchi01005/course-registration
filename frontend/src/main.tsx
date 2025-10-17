import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRouting } from './AppRounting'

// import toàn bộ file css ở trang này để triển khai trên toàn bộ frontend
import "./styles/tailwind.css"
import "./styles/text.css"
import "./styles/scrollbar.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> 
      <AppRouting />
    </BrowserRouter>
  </StrictMode>,
)
