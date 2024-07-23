import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Property {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface PropertiesState {
  properties: Property[];
}

const initialState: PropertiesState = {
  properties: [
    { id: '1', name: 'Property One', image: '/src/assets/property1.jpg', description: 'Description for Property One' },
    { id: '2', name: 'Property Two', image: '/src/assets/property2.jpg', description: 'Description for Property Two' },
    { id: '3', name: 'Property Three', image: '/src/assets/property3.jpg', description: 'Description for Property Three' },
  ],
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    addProperty: (state, action: PayloadAction<Property>) => {
      state.properties.push(action.payload);
    },
    updateProperty: (state, action: PayloadAction<Property>) => {
      const index = state.properties.findIndex(property => property.id === action.payload.id);
      if (index !== -1) {
        state.properties[index] = action.payload;
      }
    },
    deleteProperty: (state, action: PayloadAction<string>) => {
      state.properties = state.properties.filter(property => property.id !== action.payload);
    },
  },
});

export const { addProperty, updateProperty, deleteProperty } = propertiesSlice.actions;
export default propertiesSlice.reducer;
