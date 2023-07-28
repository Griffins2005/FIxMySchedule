import React from 'react';
import axios from 'axios';

function EventItem({ event, onEventDeleted }) {
  // ...
// ...
const handleDeleteClick = () => {
  if (event._id) {
    const token = localStorage.getItem('token');
    axios.delete(`https://planyourschedule.onrender.com/api/schedule/${event._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        // Notify the parent that this event has been deleted
        onEventDeleted(event._id);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log('Cannot delete, no ID found for this event');
  }
};
// ...
  return (
    <div>
      <h2><strong>{event.title}</strong></h2>
      <p>Description: {event.description}</p>
      <p>Venue: {event.venue}</p>
      <p>Start Time: {new Date(event.startTime).toLocaleString()}</p>
      <p>End Time: {new Date(event.endTime).toLocaleString()}</p>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}

export default EventItem;
