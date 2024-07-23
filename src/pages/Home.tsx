import React from 'react';
import BookingList from '../components/BookingList';
import PropertyList from '../components/PropertyList';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold mb-8">Booking Management</h1>
      <BookingList />
      <PropertyList />
    </div>
  );
};

export default Home;
