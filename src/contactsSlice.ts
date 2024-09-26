import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  name: string;
  email: string;
}

interface ContactsState {
  contacts: Contact[];
  editForm: number | null;
}

const initialState: ContactsState = {
  contacts: [],
  editForm: null,
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
  },
});

export const { addContact, editContact, deleteContact, setEditForm } = contactsSlice.actions;

export default contactsSlice.reducer;
