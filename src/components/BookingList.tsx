import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBooking } from '../store/bookingsSlice';
import { Booking } from '../types';
import BookingForm from './BookingForm';
import Modal from './Modal';
import { Button, Table } from 'flowbite-react';

interface BookingListProps {
  bookings: Booking[];
  propertyName: string;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, propertyName }) => {
  const dispatch = useDispatch();
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const handleDelete = (id: string) => {
    dispatch(deleteBooking(id));
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
  };

  const handleFormSubmit = () => {
    setEditingBooking(null);
  };

  const handleCloseModal = () => {
    setEditingBooking(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Bookings for {propertyName}</h2>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Property</Table.HeadCell>
          <Table.HeadCell>Start Date</Table.HeadCell>
          <Table.HeadCell>End Date</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {bookings.map(booking => (
            <Table.Row key={booking.id} className="bg-white">
              <Table.Cell>{booking.name}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <div className="w-2 h-2 mr-2 rounded-full" style={{ backgroundColor: booking.color }}></div>
                  {booking.property}
                </div>
              </Table.Cell>
              <Table.Cell>{new Date(booking.startDate).toLocaleDateString()}</Table.Cell>
              <Table.Cell>{new Date(booking.endDate).toLocaleDateString()}</Table.Cell>
              <Table.Cell>
                <div className="flex space-x-2">
                  <Button onClick={() => handleEdit(booking)} size="xs">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(booking.id)} size="xs" color="failure">
                    Delete
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {editingBooking && (
        <Modal isOpen={!!editingBooking} onClose={handleCloseModal}>
          <BookingForm initialData={editingBooking} onSubmit={handleFormSubmit} property={editingBooking.property} />
        </Modal>
      )}

    </div>
  );
};

export default BookingList;
