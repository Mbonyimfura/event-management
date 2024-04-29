import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import AdminDashBoard from '../components/AdminDashBoard';
import axios from 'axios'

function AdminBookingPage() {
    const {id} = useParams()
    const [booking,setBooking] = useState(null);

    useEffect(() => {
      if (id) {
        axios.get('/admin').then(response => {
          const foundBooking = response.data.find(({_id}) => _id ===id )
          if (foundBooking) {
            setBooking(foundBooking)
          }
        });
      }
    },[id]);

    if ( !booking) {
      return '';
    }
  return (
    <div>
      <AdminDashBoard/>
      <h1 className='text-3xl'>{booking.event.title}</h1>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex  items-center justify-between">
        <div>
        <h2 className='text-2xl mb-4'> Booking information:</h2>
        <div>Your name: {booking.name}</div>
        <div>Your phone: {booking.phone}</div>
        <div>Number of tickets: {booking.numberOfTickets}</div>
        </div>
        <div className='bg-primary p-6 text-white rounded-2xl'>
          <div>Total price</div>
          <div>${booking.price}</div>
        </div>
      </div>
    </div>
  )
}

export default AdminBookingPage;