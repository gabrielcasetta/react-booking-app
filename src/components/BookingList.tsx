import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBooking } from '../store/bookingsSlice';
import { Booking } from '../types';
import BookingForm from './BookingForm';
import Modal from './Modal';

interface BookingListProps {
  bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
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

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-black">Bookings</h2>
      <ul className="space-y-4">
        {bookings.map(booking => (
          <li key={booking.id} className="p-4 border rounded shadow-sm bg-gray-50 relative">
            <div className="absolute top-0 left-0 w-2 h-full" style={{ backgroundColor: booking.color }}></div>
            <div className="ml-4">
              <div className="mb-2 text-black">
                <strong>Property:</strong> {booking.property}
              </div>
              <div className="mb-2 text-black">
                <strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}
              </div>
              <div className="mb-2 text-black">
                <strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}
              </div>
              <div className="flex space-x-4">
                <button onClick={() => handleEdit(booking)} className="text-indigo-500 hover:underline">Update</button>
                <button onClick={() => handleDelete(booking.id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {editingBooking && (
        <Modal isOpen={!!editingBooking} onClose={handleCloseModal}>
          <BookingForm initialData={editingBooking} onSubmit={handleFormSubmit} property={editingBooking.property} />
        </Modal>
      )}
    </div>
  );
};

export default BookingList;
