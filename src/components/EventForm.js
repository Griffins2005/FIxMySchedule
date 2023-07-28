// EventForm.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import EventItem from './EventItem';

function EventForm({ onSuccess }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState(''); // New state variable for token

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    setToken(localToken);
    console.log(localToken)
    axios.get('https://planyourschedule.onrender.com/api/schedule', { headers: { authorization: `Bearer ${localToken}` } })
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      })
  }, []);
  
  const handleEventDeleted = (id) => {
    setEvents(events.filter(event => event._id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && venue && startDate && endDate) {
      axios.post('https://planyourschedule.onrender.com/api/schedule', {
        title,
        description,
        venue,
        startTime: startDate,
        endTime: endDate,
      }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use token from state
        },
    })
      .then((response) => {
        // Update the events state with the new event
        setEvents([...events, response.data]);
        setShowForm(false);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      console.log('All fields must be filled!');
    }
  };

  return (
    <div>
      {!showForm ? (
        <button className='add' onClick={() => setShowForm(true)}>+</button>
      ) : (
        <form className='event-form' onSubmit={handleSubmit}>
          <label>
            <strong>Title:</strong>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
          <label>
            Venue:
            <textarea value={venue} onChange={(e) => setVenue(e.target.value)} required />
          </label>
          <label>
            Start Time:
            <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </label>
          <label>
            End Time:
            <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}
    
      {events.map((event) => (
        <div key={event._id} className="event-container">
          <EventItem event={event} onEventDeleted={handleEventDeleted} />
        </div>
      ))}
    </div>
  );
}

export default EventForm;
