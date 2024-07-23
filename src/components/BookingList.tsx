import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteBooking } from '../store/bookingsSlice';
import { Booking } from '../types';

interface BookingListProps {
  bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  const dispatch = useDispatch();

  if (!bookings || bookings.length === 0) {
    return <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow-md">No bookings available.</div>;
  }

  const handleDelete = (id: string) => {
    dispatch(deleteBooking(id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
      <ul className="space-y-4">
        {bookings.map(booking => (
          <li key={booking.id} className="p-4 border rounded shadow-sm bg-gray-50">
            <div className="mb-2">
              <strong>Property:</strong> {booking.property}
            </div>
            <div className="mb-2">
              <strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}
            </div>
            <div className="mb-2">
              <strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}
            </div>
            <div className="flex space-x-4">
              <Link to={`/booking/${booking.id}`} className="text-indigo-500 hover:underline">Update</Link>
              <button onClick={() => handleDelete(booking.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
