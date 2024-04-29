import axios from 'axios'
import { Routes, Route } from 'react-router-dom' // Add this line
import './App.css'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import IndexPage from './pages/IndexPage'
import ProfilePage from './pages/ProfilePage'
import EventsPage from './pages/EventsPage'
import EventsFormPage from './pages/EventsFormPage'
import EventPage from './pages/EventPage'
import EventBookingPage from './pages/EventBookingPage'
import EventBookingsPage from './pages/EventBookingsPage'
import { UserContextProvider } from './store/UserContext'
import AdminDashBoardPage from './pages/AdminDashBoardPage'
import AdminBookingsPage from './pages/AdminBookingsPage'
import AdminBookingPage from './pages/AdminBookingPage'
import AdminProfilePage from './pages/AdminProfilePage'
import AdminRoute from './pages/AdminRoute'

axios.defaults.baseURL='http://localhost:3000/api/v1'
axios.defaults.withCredentials= true
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/events" element={<EventsPage/>} />
          <Route path="/events/:id" element={<EventsPage />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/account/bookings" element={< EventBookingsPage />} />
          <Route path="/account/bookings/:id" element={< EventBookingPage/>} />
          <Route path="/admin" element={
  <AdminRoute>
    <AdminProfilePage/>
    
  </AdminRoute>
} />
       <Route path="/admin/events" element={
  <AdminRoute>
    <EventsPage/>
  </AdminRoute>
} />
<Route path="/admin/bookings" element={
  <AdminRoute>
    <AdminBookingsPage/>
  </AdminRoute>
} />
<Route path="/admin/bookings/:id" element={
  <AdminRoute>
    <AdminBookingPage/>
  </AdminRoute>
} />
<Route path="/admin/events/new" element={
  <AdminRoute>
    <EventsFormPage/>
  </AdminRoute>
} />
<Route path="/admin/events/:id" element={
  <AdminRoute>
    <EventsFormPage/>
  </AdminRoute>
} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
