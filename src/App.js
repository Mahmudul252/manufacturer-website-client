import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Blogs from './Pages/Blogs/Blogs';
import AddProduct from './Pages/Dashboard/AddProduct';
import AddReview from './Pages/Dashboard/AddReview';
import Dashboard from './Pages/Dashboard/Dashboard';
import MakeAdmin from './Pages/Dashboard/MakeAdmin';
import ManageOrders from './Pages/Dashboard/ManageOrders';
import ManageProducts from './Pages/Dashboard/ManageProducts';
import MyOrders from './Pages/Dashboard/MyOrders';
import MyProfile from './Pages/Dashboard/MyProfile';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import RequireAuth from './Pages/Login/RequireAuth';
import SignUp from './Pages/Login/SignUp';
import MyPortFolio from './Pages/MyPortFolio/MyPortFolio';
import NotFound from './Pages/NotFound/NotFound';
import Payment from './Pages/Payment/Payment';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Reviews from './Pages/Reviews/Reviews';
import Footer from './Pages/Shared/Footer';
import Header from './Pages/Shared/Header';
import Tools from './Pages/Tools/Tools';
import UnAuthorizedAccess from './Pages/UnAuthorizedAccess/UnAuthorizedAccess';

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
        <Route path='/payment' element={
          <RequireAuth>
            <Payment />
          </RequireAuth>
        } />

        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }>
          <Route path='myOrders' element={
            <RequireAuth>
              <MyOrders />
            </RequireAuth>
          } />
          <Route path='addReview' element={
            <RequireAuth>
              <AddReview />
            </RequireAuth>
          } />
          <Route path='manageOrders' element={
            <RequireAuth>
              <ManageOrders />
            </RequireAuth>
          } />
          <Route path='addProduct' element={
            <RequireAuth>
              <AddProduct />
            </RequireAuth>
          } />
          <Route path='makeAdmin' element={
            <RequireAuth>
              <MakeAdmin />
            </RequireAuth>
          } />
          <Route path='manageProducts' element={
            <RequireAuth>
              <ManageProducts />
            </RequireAuth>
          } />
          <Route path='myProfile' element={
            <RequireAuth>
              <MyProfile />
            </RequireAuth>
          } />
        </Route>

        <Route path='/reviews' element={<Reviews />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/myPortfolio' element={<MyPortFolio />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/unAuthorizedAccess' element={<UnAuthorizedAccess />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
