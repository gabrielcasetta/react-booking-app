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
    { id: '4', name: 'Property Four', image: '/src/assets/property1.jpg', description: 'Description for Property Four' },
    { id: '5', name: 'Property Five', image: '/src/assets/property2.jpg', description: 'Description for Property Five' },
    { id: '6', name: 'Property Six', image: '/src/assets/property3.jpg', description: 'Description for Property Six' },
    { id: '7', name: 'Property Seven', image: '/src/assets/property2.jpg', description: 'Description for Property Seven' },
    { id: '8', name: 'Property Eight', image: '/src/assets/property3.jpg', description: 'Description for Property Eight' },
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
