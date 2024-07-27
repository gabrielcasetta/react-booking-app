import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProperty, updateProperty } from '../store/propertiesSlice';
import { Property } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Button, Label, TextInput, Textarea, FileInput } from 'flowbite-react';

interface PropertyFormProps {
  initialData?: Property;
  onSubmit: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, onSubmit }) => {
  const dispatch = useDispatch();
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded">
      <div className="mb-4">
        <Label htmlFor="name">Property Name:</Label>
        <TextInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className=""
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="description">Description:</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className=""
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="image">Image:</Label>
        <FileInput
          accept="image/*"
          onChange={handleImageChange}
          className=""
        />
      </div>
      <div className="flex space-x-4">
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
