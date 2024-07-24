import React, { useState } from 'react';
import PropertyList from '../components/PropertyList';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Home: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [filteredProperties, setFilteredProperties] = useState<string[]>([]);
  const properties = useSelector((state: RootState) => state.properties.properties);
  const bookings = useSelector((state: RootState) => state.bookings.bookings);

  const handleSearch = () => {
    if (!checkInDate || !checkOutDate) {
      alert('Please select both check-in and check-out dates.');
      return;
    }

    const availableProperties = properties.filter(property => {
      const propertyBookings = bookings.filter(booking => booking.property === property.name);
      return propertyBookings.every(booking => {
        const existingStart = new Date(booking.startDate);
        const existingEnd = new Date(booking.endDate);
        return (checkOutDate <= existingStart || checkInDate >= existingEnd);
      });
    });

    setFilteredProperties(availableProperties.map(property => property.id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Check Availability</h1>
      <div className="flex space-x-4 mb-8">
        <div className="flex flex-col">
          <label className="block text-gray-700 font-semibold">Check-in Date:</label>
          <DatePicker
            selected={checkInDate}
            onChange={(date: Date) => setCheckInDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="yyyy/MM/dd"
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-gray-700 font-semibold">Check-out Date:</label>
          <DatePicker
            selected={checkOutDate}
            onChange={(date: Date) => setCheckOutDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="yyyy/MM/dd"
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
        </div>
        <button
          onClick={handleSearch}
          className="mt-6 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </div>
      <PropertyList filteredProperties={filteredProperties} />
    </div>
  );
};

export default Home;
