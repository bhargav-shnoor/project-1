import { useEffect, useState } from 'react';
import axios from 'axios';

function EventsPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/events')
            .then(res => setEvents(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h2>All Events</h2>
            {events.map(event => (
                <div key={event._id}>
                    <h3>{event.title}</h3>
                    <p>{event.location}</p>
                    <p>Capacity: {event.capacity}</p>
                </div>
            ))}
        </div>
    );
}

export default EventsPage;