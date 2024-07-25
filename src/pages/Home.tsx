import React, { useState } from 'react';
import PropertyList from '../components/PropertyList';
import { Button, Label } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const Home: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [filteredProperties, setFilteredProperties] = useState<string[]>([]);
  const properties = useSelector((state: RootState) => state.properties.properties);
  const bookings = useSelector((state: RootState) => state.bookings.bookings);

  const handleSearch = () => {
    if (!dateRange.start || !dateRange.end) {
      alert('Please select a date range.');
      return;
    }

    const checkInDate = new Date(dateRange.start);
    const checkOutDate = new Date(dateRange.end);

    const availableProperties = properties.filter(property => {
      const propertyBookings = bookings.filter(booking => booking.property === property.name);
      return propertyBookings.every(booking => {
        const existingStart = new Date(booking.startDate);
        const existingEnd = new Date(booking.endDate);
        return checkOutDate <= existingStart || checkInDate >= existingEnd;
      });
    });

    setFilteredProperties(availableProperties.map(property => property.id));
  };

  return (
    <div>
      <section className="relative h-[80vh] overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
          <source src="/src/assets/homebg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-8">Welcome to Our Property Booking</h1>
            <p className="text-lg mb-8">Find the perfect property for your stay.</p>
          </div>
        </div>
      </section>
      <div className="container mx-auto p-4">
        <div className="relative flex justify-center mt-[-100px] z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-end gap-4">
            <div className="flex flex-col">
              <div id="date-range-picker" className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Label htmlFor="datepicker-range-start">Check-in Date:</Label>
                  <input
                    id="datepicker-range-start"
                    name="start"
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <Label htmlFor="datepicker-range-end">Check-out Date:</Label>
                  <input
                    id="datepicker-range-end"
                    name="end"
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <Button
              onClick={handleSearch}
              className=""
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2"/>
              Check Availability
            </Button>
          </div>
        </div>
        <PropertyList filteredProperties={filteredProperties} />
      </div>
    </div>
  );
};

export default Home;
