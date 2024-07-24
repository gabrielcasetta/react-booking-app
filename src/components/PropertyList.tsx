import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteProperty } from '../store/propertiesSlice';
import { Link, useNavigate } from 'react-router-dom';
import PropertyForm from './PropertyForm';
import Modal from './Modal';

const PropertyList: React.FC = () => {
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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {properties.map(property => (
          <div key={property.id} className="border rounded-lg shadow-sm p-4 bg-white">
            <img src={property.image} alt={property.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black">{property.name}</h3>
              <p className="text-gray-600">{property.description}</p>
              <div className="flex space-x-4">
                <button onClick={() => handleEdit(property.id)} className="text-indigo-500 hover:underline">Manage Bookings</button>
                <button onClick={() => handleDelete(property.id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleAddProperty} className="mt-4 text-center text-white bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-600">
        Add Property
      </button>

      <Modal isOpen={addingProperty} onClose={handleCloseModal}>
        <PropertyForm onSubmit={handleFormSubmit} />
      </Modal>
    </div>
  );
};

export default PropertyList;
