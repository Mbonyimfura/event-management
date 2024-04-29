import React, { useState, useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import AccountNav from '../components/AccountNav'
import axios from 'axios'

function EventBookingPage() {
    const {id} = useParams()
    const [booking,setBooking] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (id) {
        axios.get('/bookings').then(response => {
          const foundBooking = response.data.find(({_id}) => _id ===id )
          if (foundBooking) {
            setBooking(foundBooking)
          }
        });
      }
    },[id]);

    const deleteBooking = () => {
      axios.delete(`/bookings/${id}`).then(() => {
        navigate('/account/bookings')
      });
    };

    if ( !booking) {
      return '';
    }

    if ( !booking) {
      return '';
    }
    
  return (
    <div>
      <AccountNav/>
      <h1 className='text-3xl'>{booking.event.title}</h1>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex  items-center justify-between">
        <div>
        <h2 className='text-2xl mb-4'>Your booking information:</h2>
        <div>Your name: {booking.name}</div>
        <div>Your phone: {booking.phone}</div>
        <div>Number of tickets: {booking.numberOfTickets}</div>
        </div>
       <div className='flex gap-1'>
       <div className='bg-primary p-6 text-white rounded-2xl'>
          <div>Total price</div>
          <div>${booking.price}</div>
        </div>
        <button className='primary ' onClick={deleteBooking}>Cancel</button>
       </div>
      </div>
    </div>
  )
}

export default EventBookingPage;