

import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import AdminDashBoard from '../components/AdminDashBoard'

function EventFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [tickets, setTickets] = useState('')
  const [photo, setPhoto] = useState(null)
  const [price, setPrice] = useState('')
  const [redirect, setRedirect] = useState(null)

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/events/' + id).then(response => {
      const { data } = response;
      setTitle(data.title);
      setDate(data.date);
      setLocation(data.location);
      setDescription(data.description);
      setTickets(data.tickets);
      setPhoto(data.photo); 
      setPrice(data.price);
    })
  }, [id])

  async function saveEvent(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('tickets', tickets);
    formData.append('price', price);
    formData.append('photo', photo);
    formData.append('id', id);
    if (id) {
      try {
      await axios.put('/events/' + id, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }
        });
      setRedirect(true);
      } catch (error) {
      console.error('Error updating event:', error);
      }
    } else {
      try {
      await axios.post('/events/create', formData);
      setRedirect(true);
      } catch (error) {
      console.error('Error creating event:', error);
      }
    }
  }

 
  if (redirect){
    return <Navigate to={'/admin/events'}/>
   }
  return (
    <div>
     <AdminDashBoard/>
      <form onSubmit={saveEvent}>
        <h2 className='text-2xl mt-4'>Event Name</h2>
        <input type="text" placeholder='Event Name' value={title} onChange={e => setTitle(e.target.value)} />

        <h2 className='text-2xl mt-4'>Date</h2>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />

        <h2 className='text-2xl mt-4'>Location</h2>
        <input type="text" placeholder='Location' value={location} onChange={e => setLocation(e.target.value)} />

        <h2 className='text-2xl mt-4'>Description</h2>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />

        <h2 className='text-2xl mt-4'>Tickets</h2>
        <input type="number" placeholder='Number of Tickets' value={tickets} onChange={e => setTickets(e.target.value)} />

        <h2 className='text-2xl mt-4'>Price</h2>
        <input type="number" placeholder='Price' value={price} onChange={e => setPrice(e.target.value)} />

        <h2 className='text-2xl mt-4'>Photo</h2>
        <input type="file" onChange={e => setPhoto(e.target.files[0])} />

        <button className='primary my-4'>Save</button>
      </form>
    </div>
  )
}

export default EventFormPage