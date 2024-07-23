// src/pages/CreateBooking.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';

const CreateBooking: React.FC = () => {
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create Booking</h2>
      <BookingForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default CreateBooking;
