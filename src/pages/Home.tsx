import React, { useState } from 'react';
import PropertyList from '../components/PropertyList';
import { Button, Label } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Home: React.FC = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const [filteredProperties, setFilteredProperties] = useState<string[]>([]);
  const properties = useSelector((state: RootState) => state.properties.properties);
  const bookings = useSelector((state: RootState) => state.bookings.bookings);

  const handleSearch = () => {
    const { startDate, endDate } = dateRange[0];
    if (!startDate || !endDate) {
      alert('Please select a date range.');
      return;
    }

    const checkInDate = new Date(startDate);
    const checkOutDate = new Date(endDate);

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
        <div className="relative flex justify-center mt-[-200px] z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4">
            <div id="date-range-picker" className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col">
                <div className="flex flex-row w-full">
                  <Label htmlFor="datepicker-range-start" className="mb-2 w-1/2">Check-in Date:</Label>
                  <Label htmlFor="datepicker-range-end" className="mb-2 text-right w-1/2 text-left">Checkout Date:</Label>
                </div>
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setDateRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  rangeColors={['rgb(21 94 117 / var(--tw-bg-opacity))']}
                />
              </div>
            </div>
            <Button onClick={handleSearch} className="w-full text-white px-4 py-2 rounded-md flex justify-center items-center">
              <FontAwesomeIcon icon={faSearch} className="me-2" />
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
