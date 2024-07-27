import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import BookingList from '../components/BookingList';
import BookingForm from '../components/BookingForm';
import { Breadcrumb, Carousel } from 'flowbite-react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const ManageBookings: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const property = useSelector((state: RootState) => state.properties.properties.find(prop => prop.id === id));
  const bookings = useSelector((state: RootState) => state.bookings.bookings.filter(booking => booking.property === property?.name));

  const handleHome = () => {
    navigate(-1);
  };

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="container mx-auto min-h-screen py-8">
      <Breadcrumb aria-label="Solid background breadcrumb example" className="bg-gray-50 py-3 dark:bg-gray-800">
        <Breadcrumb.Item onClick={handleHome} className="cursor-pointer text-black">
          <FontAwesomeIcon icon={faHome} className="me-2" />
            Home
        </Breadcrumb.Item>
        <Breadcrumb.Item className="font-light">{property.name}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          <img src={property.image} alt="..." />
          <img src={property.image} alt="..." />
          <img src={property.image} alt="..." />
          <img src={property.image} alt="..." />
          <img src={property.image} alt="..." />
        </Carousel>
      </div>
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
