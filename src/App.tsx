import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'

function Routes() {
  return useRoutes(routes)
}

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

export default App
