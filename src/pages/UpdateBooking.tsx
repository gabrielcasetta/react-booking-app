import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import BookingForm from '../components/BookingForm';
import { Booking } from '../types';

const UpdateBooking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const booking = useSelector((state: RootState) => state.bookings.bookings.find(b => b.id === id));

  if (!booking) {
    return <div>Booking not found</div>;
  }

  const handleFormSubmit = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Booking</h2>
      <BookingForm initialData={booking} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default UpdateBooking;
