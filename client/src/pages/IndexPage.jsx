import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {format} from 'date-fns'

function IndexPage() {
  const [events, setEvents] =  useState([]);
  useEffect(() => {
    axios.get('/events/all').then(response => {
      setEvents(response.data)
    })
  },[])
  return (
    <>
      <h1 style={{ fontSize: '2rem', textAlign: 'center', fontWeight: 'bold' }}>Our Upcoming events</h1>
      <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-col-4'>
        {events.length > 0 && events.map(event => (
          <Link to={'/event/'+event._id}>
            <div className='bg-gray-500 mb-2 rounded-2xl flex'>
            {
              <img className="object-cover" src={`${event.photo}`} alt={event.title} />
            }
            </div>
            <h2 className='font-bold'>{event.title}</h2>
            <h2 className='text-sm  text-gray-500'>{event.location}</h2>
            <h2 className='text-sm  text-gray-500'> {format(new Date(event.date), 'yyyy-MM-dd')}</h2>
            <div className='mt-1'>
              <span className='font-bold'>${event.price}</span> per a person.
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default IndexPage