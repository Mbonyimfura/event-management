import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../store/UserContext'

function EventBookingWidget({event}) {

    const [numberOfTickets, setNumberOfTickets] = useState(1)
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [redirect,setRedirect] = useState('')
    const {user} = useContext(UserContext);

    useEffect(() => {
      if (user) {
        setName(user.name);
      }
    },[user])

  if (!user) {
    return <Navigate to="/login" />;
  }

  async function bookThisEvent() {
    const response = await axios.post('/bookings', {
      numberOfTickets,
      name,
      phone,
      event: event._id,
      price: numberOfTickets * event.price
    });
  
    const eventId = response.data.event;
    if (!eventId) {
      throw new Error('Event ID is not defined');
    }
  
    if (!event || numberOfTickets === undefined) {
      throw new Error('Event or number of tickets is not defined');
    }
  
    const updatedTickets = event.tickets - numberOfTickets;
  
    try {
      const updateResponse = await axios.patch(`/bookings/${eventId}`, { numberOfTickets: updatedTickets });
      if (updateResponse.data.numberOfTickets === updatedTickets) {
        event.tickets = updateResponse.data.numberOfTickets;
      } else {
        throw new Error('Updated tickets not received from server');
      }
    } catch (err) {
      console.error(err);
    
    }

    setRedirect(`/account/bookings`);
  }
  
  if (redirect){
    return <Navigate to={redirect}/>
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <h2 className="text-2xl"></h2>
      <div className="text-2xl text-center">
        Price: ${event.price} / per ticket
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="py-3 p-4 border-t">
          <label>Number of tickets:</label>
          <input type="number"  value={numberOfTickets} onChange={e => setNumberOfTickets(e.target.value)}/>
        </div>
        <div className="py-3 p-4 border-t">
          <label>Your full name:</label>
          <input type="text"  value={name} onChange={e => setName(e.target.value)}/>
          <label>Your phone number:</label>
          <input type="tel"  value={phone} onChange={e => setPhone(e.target.value)}/>
        </div>
      </div>
      <button onClick={bookThisEvent} className="primary mt-4">
        Book spot in this event 
        <span> ${numberOfTickets * event.price} </span>
      </button>
    </div>
  )
}

export default EventBookingWidget;