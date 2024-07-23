import React from 'react';
import PropertyList from '../components/PropertyList';

const ManageProperties: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Manage Properties</h1>
      <PropertyList />
    </div>
  );
};

export default ManageProperties;
