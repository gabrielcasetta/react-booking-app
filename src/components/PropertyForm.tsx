import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProperty, updateProperty } from '../store/propertiesSlice';
import { Property } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Button, Label, TextInput, Textarea, FileInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

interface PropertyFormProps {
  initialData?: Property;
  onSubmit: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, onSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image && !initialData?.image) {
      alert('Please upload an image.');
      return;
    }

    const imagePath = image ? URL.createObjectURL(image) : initialData.image;

    const property: Property = {
      id: initialData?.id || uuidv4(),
      name,
      description,
      image: imagePath,
    };

    if (initialData) {
      dispatch(updateProperty(property));
    } else {
      dispatch(addProperty(property));
    }

    onSubmit();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <Label htmlFor="name">Property Name:</Label>
        <TextInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="description">Description:</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="image">Image:</Label>
        <FileInput
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>
      <div className="flex space-x-4">
        <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
