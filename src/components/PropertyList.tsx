import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteProperty } from '../store/propertiesSlice';
import { useNavigate } from 'react-router-dom';
import PropertyForm from './PropertyForm';
import Modal from './Modal';
import { Button, Card } from 'flowbite-react';

interface PropertyListProps {
  filteredProperties: string[];
}

const PropertyList: React.FC<PropertyListProps> = ({ filteredProperties }) => {
  const properties = useSelector((state: RootState) => state.properties.properties);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addingProperty, setAddingProperty] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    dispatch(deleteProperty(id));
  };

  const handleEdit = (id: string) => {
    navigate(`/bookings/${id}`);
  };

  const handleFormSubmit = () => {
    setAddingProperty(false);
  };

  const handleAddProperty = () => {
    setAddingProperty(true);
  };

  const handleCloseModal = () => {
    setAddingProperty(false);
  };

  const displayedProperties = filteredProperties.length > 0
    ? properties.filter(property => filteredProperties.includes(property.id))
    : properties;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayedProperties.map(property => (
          <Card key={property.id} className="border rounded-lg shadow-sm p-4 bg-white">
            <img src={property.image} alt={property.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{property.name}</h3>
              <p className="text-gray-600">{property.description}</p>
              <div className="flex space-x-4">
                <Button onClick={() => handleEdit(property.id)} className="text-indigo-500 hover:underline">Manage Bookings</Button>
                <Button onClick={() => handleDelete(property.id)} className="text-red-500 hover:underline">Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Button onClick={handleAddProperty} className="mt-4 text-center text-white bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-600">
        Add Property
      </Button>

      <Modal isOpen={addingProperty} onClose={handleCloseModal}>
        <PropertyForm onSubmit={handleFormSubmit} />
      </Modal>
    </div>
  );
};

export default PropertyList;
