import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from './Modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function MyCalendar() {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      start: new Date(2025, 5, 28, 10, 0),
      end: new Date(2025, 5, 28, 11, 0),
      desc: 'Weekly sync with development team',
    },
    {
      id: 2,
      title: 'Project Deadline',
      start: new Date(2025, 5, 30, 0, 0),
      end: new Date(2025, 5, 30, 0, 0),
      desc: 'Submit project report',
    },
  ]);
  const [newEvent, setNewEvent] = useState({ title: '', desc: '', start: null });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSelectSlot = ({ start }) => {
    setNewEvent({ title: '', desc: '', start });
  };

  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent, id: events.length + 1, end: new Date(newEvent.start.getTime() + 60 * 60 * 1000) }]);
    setSuccessMessage('Event added successfully');
    setNewEvent({ title: '', desc: '', start: null });
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="calendar-container">
      <h2>Event Schedule</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => setSelectedEvent(event)}
        tooltipAccessor="desc"
      />
      {newEvent.start && (
        <Modal
          title="Add New Event"
          onClose={() => setNewEvent({ title: '', desc: '', start: null })}
          onConfirm={handleAddEvent}
          confirmText="Add Event"
          cancelText="Cancel"
        >
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            aria-label="Event title"
          />
          <input
            type="text"
            placeholder="Description"
            value={newEvent.desc}
            onChange={(e) => setNewEvent({ ...newEvent, desc: e.target.value })}
            aria-label="Event description"
          />
        </Modal>
      )}
      {selectedEvent && (
        <Modal
          title={selectedEvent.title}
          onClose={() => setSelectedEvent(null)}
          confirmText="Close"
        >
          <p>{selectedEvent.desc}</p>
          <p>Start: {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm a')}</p>
          <p>End: {moment(selectedEvent.end).format('MMMM Do YYYY, h:mm a')}</p>
        </Modal>
      )}
    </div>
  );
}

export default MyCalendar;