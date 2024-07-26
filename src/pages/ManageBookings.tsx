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
    <div className="container mx-auto min-h-screen">
      <div className="flex gap-4">
        <div className="grow mt-8">
          <BookingList bookings={bookings} propertyName={property.name} />
        </div>
        <div className="grow mt-8">
          <BookingForm property={property.name} onSubmit={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
