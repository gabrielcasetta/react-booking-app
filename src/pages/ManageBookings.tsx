import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import BookingList from '../components/BookingList';
import BookingForm from '../components/BookingForm';

const ManageBookings: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = useSelector((state: RootState) => state.properties.properties.find(prop => prop.id === id));
  const bookings = useSelector((state: RootState) => state.bookings.bookings.filter(booking => booking.property === property?.name));

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Bookings for {property.name}</h1>
      <BookingList bookings={bookings} />
      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-4">Add Booking</h2>
        <BookingForm property={property.name} onSubmit={() => {}} />
      </div>
    </div>
  );
};

export default ManageBookings;
