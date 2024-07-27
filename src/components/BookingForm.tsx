import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBooking, updateBooking } from '../store/bookingsSlice';
import { RootState } from '../store';
import { Booking } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Alert, Button, Datepicker, Label, TextInput } from 'flowbite-react';
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
  const [name, setName] = useState(initialData?.name || '');
  const [startDate, setStartDate] = useState(initialData?.startDate ? new Date(initialData.startDate) : new Date());
  const [endDate, setEndDate] = useState(initialData?.endDate ? new Date(initialData.endDate) : new Date());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset the time part to compare only the date

    if (startDate < today) {
      setError('Start date cannot be before today.');
      return;
    }

    if (startDate >= endDate) {
      setError('End date must be after start date.');
      return;
    }

    const booking: Booking = {
      id: initialData?.id || uuidv4(),
      name,
      property,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
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
    <form onSubmit={handleSubmit} className={!initialData ? "max-w-4xl mx-auto p-4 bg-white rounded shadow-md":""}>
      {!initialData && (
        <h2 className="text-2xl font-semibold mb-4 font-light">Add Booking</h2>
      )}
      {error && 
        <Alert color="failure">
          <span className="font-medium">{error}</span>
        </Alert>
      }
      <div className="mb-4">
        <Label htmlFor="name">Name:</Label>
        <TextInput
          type="text"
          value={name}
          placeholder='John Doe'
          onChange={(e) => setName(e.target.value)}
          required
          className=""
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="startDate">Start Date:</Label>
        <Datepicker 
          defaultDate={startDate}
          onSelectedDateChanged={(date: Date) => setStartDate(date)}
          required
          className=""
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="endDate">End Date:</Label>
        <Datepicker
          defaultDate={endDate}
          onSelectedDateChanged={(date: Date) => setEndDate(date)}
          required
          className=""
        />
      </div>
      <div className="flex space-x-4">
        <Button type="submit" className="w-full">
          Submit
        </Button>
        {!initialData && (
          <Button type="button" onClick={handleCancel} className="w-">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
