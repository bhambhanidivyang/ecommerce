import './App.css'
import { Home } from './routes/home/Home'
import { Contact } from './routes/contact/Contact'
import {Routes, Route} from 'react-router-dom'
import { Navigation } from './routes/navigation/Navigation'
import { AuthContainer } from './routes/auth/AuthContainer'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigation />} >
          <Route index element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sign-in' element={<AuthContainer />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
