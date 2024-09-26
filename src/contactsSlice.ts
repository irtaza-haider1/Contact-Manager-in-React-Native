import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  name: string;
  email: string;
}

interface ContactsState {
  contacts: Contact[];
  editForm: number | null;
  showInfoScreen: boolean; // New state to show the information page
}

const initialState: ContactsState = {
  contacts: [],
  editForm: null,
  showInfoScreen: false, // Initialize it to false
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    editContact: (state, action: PayloadAction<{ index: number; contact: Contact }>) => {
      const { index, contact } = action.payload;
      state.contacts[index] = contact;
      state.editForm = null; // Reset edit mode
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contacts.splice(action.payload, 1);
    },
    setEditForm: (state, action: PayloadAction<number | null>) => {
      state.editForm = action.payload;
    },
    toggleInfoScreen: (state) => {
      state.showInfoScreen = !state.showInfoScreen; // Toggle the info screen
    },
  },
});

export const { addContact, editContact, deleteContact, setEditForm, toggleInfoScreen } = contactsSlice.actions;

export default contactsSlice.reducer;
