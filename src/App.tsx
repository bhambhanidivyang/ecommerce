import './App.css'
import { useDispatch } from 'react-redux'
import { Home } from './routes/home/Home'
import { Contact } from './routes/contact/Contact'
import {Routes, Route} from 'react-router-dom'
import { Navigation } from './routes/navigation/Navigation'
import { AuthContainer } from './routes/auth/AuthContainer'
import Shop from './routes/shop/Shop'
import { Checkout } from './routes/checkout/Checkout'
import { useEffect, useState } from 'react'
import { createUserDoc, onAuthStateChangedListener } from '../utils/firebase/firebase.utils'
import { setCurrentUser } from './store/user/user.actions'
import { fetchCategoriesAsync } from './store/categories/categories.actions'

const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);

  const setLoadingState = () => {
    setLoading(true);
  }

  const unsetLoadingState = () => {
    setLoading(false);
  }

  useEffect(() => {
      setLoading(true);
      const unsubscribe = onAuthStateChangedListener(async (user) => {
          if (user) {
              await createUserDoc(user)
          }
          dispatch(setCurrentUser(user));
          unsetLoadingState();
      });
      return unsubscribe;
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchCategoriesAsync() as any);
    // addCollectionAndDocuments('categories', SHOP_DATA, 'title');
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigation />} >
          <Route index element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/shop/*' element={<Shop />} />
          <Route path='/sign-in' element={<AuthContainer setLoadingState={setLoadingState} unsetLoadingState={unsetLoadingState} loading={loading} />} />
          <Route path='/checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </>
  )
}

export default App