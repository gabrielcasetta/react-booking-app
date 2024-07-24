import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBooking, updateBooking } from '../store/bookingsSlice';
import { RootState } from '../store';
import { Booking } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Button, Label, TextInput } from 'flowbite-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

interface BookingFormProps {
  initialData?: Booking;
  onSubmit: () => void;
  property: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ initialData, onSubmit, property }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookings = useSelector((state: RootState) => state.bookings.bookings);
  const [startDate, setStartDate] = useState(initialData?.startDate ? new Date(initialData.startDate) : new Date());
  const [endDate, setEndDate] = useState(initialData?.endDate ? new Date(initialData.endDate) : new Date());
  const [color, setColor] = useState(initialData?.color || getRandomColor());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialData) {
      setColor(getRandomColor());
    }
  }, [initialData]);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (startDate >= endDate) {
      setError('End date must be after start date.');
      return;
    }

    const booking: Booking = {
      id: initialData?.id || uuidv4(),
      property,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      color,
    };

    if (isOverlapping(booking)) {
      setError('This booking overlaps with an existing booking for the same property.');
      return;
    }

    if (initialData) {
      dispatch(updateBooking(booking));
    } else {
      dispatch(addBooking(booking));
    }

    onSubmit();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const isOverlapping = (newBooking: Booking): boolean => {
    return bookings.some(booking => {
      if (booking.id === newBooking.id || booking.property !== newBooking.property) return false;
      const existingStart = new Date(booking.startDate);
      const existingEnd = new Date(booking.endDate);
      const newStart = new Date(newBooking.startDate);
      const newEnd = new Date(newBooking.endDate);

      return (newStart < existingEnd && newEnd > existingStart);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <Label htmlFor="startDate">Start Date:</Label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          dateFormat="yyyy/MM/dd"
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="endDate">End Date:</Label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          dateFormat="yyyy/MM/dd"
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="color">Color:</Label>
        <TextInput
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
          className="mt-1 block w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>
      <div className="flex space-x-4">
        <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500">
          Submit
        </Button>
        {!initialData && (
          <Button type="button" onClick={handleCancel} className="w-full bg-gray-500 hover:bg-gray-600 focus:ring-gray-500">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
