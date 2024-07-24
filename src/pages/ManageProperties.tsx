import React from 'react';
import PropertyList from '../components/PropertyList';
import { Breadcrumb } from 'flowbite-react';

const ManageProperties: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Breadcrumb aria-label="breadcrumb">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/properties">Manage Properties</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="text-3xl font-bold mb-8">Manage Properties</h1>
      <PropertyList filteredProperties={[]} />
    </div>
  );
};

export default ManageProperties;
