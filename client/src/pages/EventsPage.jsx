import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminDashBoard from '../components/AdminDashBoard';

function Events() {
  const { action } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/events/all').then(({ data }) => {
      setEvents(data);
    });
  }, []);

  const deleteEvent = async (id) => {
    try {
      await axios.delete('/events/' + id);
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <AdminDashBoard />

      {action !== 'new' && (
        <div className='text-center'>
          <br />
          <Link
            className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full'
            to={'/admin/events/new'}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
            </svg>
            Add new Event
          </Link>
        </div>
      )}
      <div className='mt-4'>
        {events.length > 0 &&
          events.map((event) => (
            <div key={event._id} className='flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl'>
              <div>
                <Link to={'/admin/events/' + event._id} className='flex-grow-0 flex-shrink-0'>
                  <div className='flex w-82 h-30 bg-gray-300'>
                    <img className='object-cover w-full' src={`${event.photo}`} alt={event.title} />
                  </div>
                  <div className='grow-0 shrink'>
                    <h2 className='text-xl'>{event.title}</h2>
                    <p className='text-sm mt-2'>{event.description}</p>
                  </div>
                </Link>
              </div>
              <button className='primary text-sm px-2 py-1 self-end w-0 h-10' onClick={() => deleteEvent(event._id)}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Events;
