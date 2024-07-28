import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { deleteProperty } from '../../store/propertiesSlice';
import { useNavigate } from 'react-router-dom';
import PropertyForm from './PropertyForm';
import Modal from '../Modal';
import { Button, Card } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

interface PropertyListProps {
  filteredProperties: string[];
}

const PropertyList: React.FC<PropertyListProps> = ({ filteredProperties }) => {
  const properties = useSelector((state: RootState) => state.properties.properties);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addingProperty, setAddingProperty] = useState<boolean>(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const handleDelete = (id: string) => {
    dispatch(deleteProperty(id));
  };

  const handleManageBookings = (id: string) => {
    navigate(`/bookings/${id}`);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
  };

  const handleFormSubmit = () => {
    setAddingProperty(false);
    setEditingProperty(null);
  };

  const handleAddProperty = () => {
    setAddingProperty(true);
  };

  const handleCloseModal = () => {
    setAddingProperty(false);
    setEditingProperty(null);
  };

  const displayedProperties = filteredProperties.length > 0
    ? properties.filter(property => filteredProperties.includes(property.id))
    : properties;

  return (
    <div className="container mx-auto mt-8">
      <style>{`
        img {
          height: 210px;
          object-fit: cover;
        }

        button span {
          align-items: center !important;
        }
      `}</style>
      <h2 className="text-2xl font-semibold mb-4">Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayedProperties.map(property => (
          <Card 
            key={property.id} 
            className="border rounded-lg shadow-sm bg-white"
            imgSrc={property.image}
            imgAlt={property.name}>
            <div className="p-4">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{property.name}</h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">{property.description}</p>
              <div className="flex justify-between space-x-4 mt-4">
                <Button onClick={() => handleManageBookings(property.id)} className="">
                  <FontAwesomeIcon icon={faEdit} className="me-2" />
                  Manage Bookings
                </Button>
                <div className='flex flex-row gap-4 items-center'>
                  <a onClick={() => handleEdit(property)} className="">
                    <FontAwesomeIcon icon={faEdit} className="me-2 cursor-pointer" />
                  </a>
                  <a onClick={() => handleDelete(property.id)} className="">
                    <FontAwesomeIcon icon={faTrash} className="me-2 cursor-pointer" />
                  </a>
                </div>
              </div>
            </div>
          </Card>
        ))}
        <Button onClick={handleAddProperty} className="bg-white text-black items-center">
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Property
        </Button>
      </div>

      <Modal isOpen={addingProperty || editingProperty !== null} onClose={handleCloseModal} header={addingProperty ? "Add Property" : "Edit Property"}>
        <PropertyForm initialData={editingProperty} onSubmit={handleFormSubmit} />
      </Modal>
    </div>
  );
};

export default PropertyList;
