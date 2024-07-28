import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBooking } from '../../store/bookingsSlice';
import { Booking } from '../../types';
import BookingForm from './BookingForm';
import Modal from '../Modal';
import { Button, Table } from 'flowbite-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface BookingListProps {
  bookings: Booking[];
  propertyName: string;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, propertyName }) => {
  const dispatch = useDispatch();
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const handleDelete = (id: string) => {
    dispatch(deleteBooking(id));
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
  };

  const handleFormSubmit = () => {
    setEditingBooking(null);
  };

  const handleCloseModal = () => {
    setEditingBooking(null);
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const booking = bookings.find(
        booking => new Date(booking.startDate) <= date && new Date(booking.endDate) >= date
      );
      if (booking) {
        return "booking-highlight";
      }
    }
    return null;
  };

  return (
    <div className="mx-auto">
      <style>{`
        .booking-highlight {
          background-color: #000;
          color: #fff;
        }

        .react-calendar, .react-calendar__month-view__weekdays {
          font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }

        .react-calendar__tile {
          border-radius: 10px;
        }

        .react-calendar__tile--now {
          background-color: rgb(14 116 144);
          color: #fff;
        }

        .react-calendar__tile--now:hover {
          background-color: rgb(21 94 117) !important;
        }
      `}</style>

      <div className="bg-white rounded shadow-md p-4 mb-8">
        <h2 className="text-2xl font-semibold mb-4"><span className='font-light'>Calendar View for </span> {propertyName}</h2>
        <Calendar
          tileClassName={tileClassName}
          className="w-full rounded-md bg-gray-50 border-none"
        />
      </div>

      <div className="bg-white rounded shadow-md p-4">
        <h2 className="text-2xl font-semibold mb-4"><span className='font-light'>Bookings for </span> {propertyName}</h2>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Property</Table.HeadCell>
            <Table.HeadCell>Start Date</Table.HeadCell>
            <Table.HeadCell>End Date</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {bookings.length === 0 ? (
              <Table.Row className="bg-white">
                <Table.Cell colSpan={5} className="text-center">
                  No current bookings. Add one now!
                </Table.Cell>
              </Table.Row>
            ) : (bookings.map(booking => (
              <Table.Row key={booking.id} className="bg-white">
                <Table.Cell>{booking.name}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <div className="w-2 h-2 mr-2 rounded-full" style={{ backgroundColor: booking.color }}></div>
                    {booking.property}
                  </div>
                </Table.Cell>
                <Table.Cell>{new Date(booking.startDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{new Date(booking.endDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleEdit(booking)} size="xs">
                      <FontAwesomeIcon icon={faEdit} className="me-2 cursor-pointer" /> Edit
                    </Button>
                    <Button onClick={() => handleDelete(booking.id)} size="xs" color="failure">
                      <FontAwesomeIcon icon={faTrash} className="me-2 cursor-pointer" /> Delete
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            )))}
          </Table.Body>
        </Table>
        

        {editingBooking && (
          <Modal isOpen={!!editingBooking} onClose={handleCloseModal} header="Edit Booking">
            <BookingForm initialData={editingBooking} onSubmit={handleFormSubmit} property={editingBooking.property} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default BookingList;
