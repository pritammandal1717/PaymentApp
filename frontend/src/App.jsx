import './App.css'
import { Toaster } from 'sonner'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Verify from './pages/Verify'
import SearchUser from './pages/SearchUser'
import SetUserDetails from './pages/SetUserDetails'
import Analysis from './pages/Analysis'
import NotFound from './pages/NotFound'
import Footer from './components/global/Footer'

function App() {

  return (
    <>
      <Toaster position="top-right" expand={false} icons={true}/>
      <BrowserRouter>
        <Routes>
          <Route path={'/error'} element={<NotFound />} />
          <Route path={'/'} element={<Signin />} />
          <Route path={'/dashboard'} element={<Dashboard />} />
          <Route path={'/signup'} element={<Signup />} />
          <Route path={'/verify'} element={<Verify />} />
          <Route path={'/send'} element={<SendMoney />} />
          <Route path={'/sendmoney'} element={<SearchUser />} />
          <Route path={'/setuserdetails'} element={<SetUserDetails />} />
          <Route path={'/analysis'} element={<Analysis />} />
        </Routes>
      </BrowserRouter>
      </>
  )
}

export default App
