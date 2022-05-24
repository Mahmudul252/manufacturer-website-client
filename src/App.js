import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import RequireAuth from './Pages/Login/RequireAuth';
import SignUp from './Pages/Login/SignUp';
import NotFound from './Pages/NotFound/NotFound';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Reviews from './Pages/Reviews/Reviews';
import Footer from './Pages/Shared/Footer';
import Header from './Pages/Shared/Header';
import Tools from './Pages/Tools/Tools';

function App() {
  return (
    <div className='main-app'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/tools' element={<Tools />} />
        <Route path='/placeOrder' element={
          <RequireAuth>
            <PlaceOrder />
          </RequireAuth>
        } />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />


        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
