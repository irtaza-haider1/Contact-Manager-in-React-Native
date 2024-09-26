import React from 'react';

import { View, Text, ScrollView, StyleSheet } from 'react-native';

import AddContact from './AddContact';

import ContactCard from './ContactCard';

import { useDispatch, useSelector } from 'react-redux';
// Imports hooks from React Redux:
// - useDispatch: allows dispatching actions to the Redux store.
// - useSelector: allows selecting data from the Redux store's state.

import { RootState } from '../store';
// Imports the type definition for the overall Redux store's state.

import { addContact, editContact, deleteContact, setEditForm } from '../contactsSlice';
// Imports action creators from a Redux slice (contactsSlice) for managing contact-related state:
// - addContact: adds a new contact.
// - editContact: edits an existing contact.
// - deleteContact: removes a contact.
// - setEditForm: sets the form for editing a contact.

const ContactManager: React.FC = () => {

  const dispatch = useDispatch();
  // Initializes the dispatch function to trigger Redux actions.

  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  // Selects the list of contacts from the Redux state using the useSelector hook.

  const editForm = useSelector((state: RootState) => state.contacts.editForm);
  // Selects the editForm state (which tracks if a contact is being edited) from the Redux state.

  const handleAddContact = (contact: { name: string; email: string }) => {
  // Defines a function to handle adding or editing a contact. It takes a contact object (name and email).
  
    if (editForm !== null) {
    // If the editForm state is not null (meaning a contact is being edited):
    
      dispatch(editContact({ index: editForm, contact }));
      // Dispatches the editContact action to update the contact at the specified index.

    } else {
      dispatch(addContact(contact));
      // Otherwise, dispatches the addContact action to add a new contact.
    }
  };

  const handleEditForm = (index: number, contact: { name: string; email: string }) => {
  // Defines a function to set the form into "edit mode" by passing the contact's index.
  
    dispatch(setEditForm(index));
    // Dispatches the setEditForm action with the contact index to initiate editing.
  };

  const handleDeleteContact = (index: number) => {
  // Defines a function to handle deleting a contact.
  
    dispatch(deleteContact(index));
    // Dispatches the deleteContact action with the contact's index to remove it.
  };

  return (
    <View style={styles.containerForm}>
    {/* Renders the main container of the ContactManager component with a defined style. */}
    
      <Text style={styles.header}>Contact Manager</Text>
      {/* Renders a header text with specific styles. */}
      
      <View style={styles.contactsList}>
      {/* A sub-container for listing contacts with applied styles. */}
      
        <Text style={styles.contactsListHeader}>Contacts List</Text>
        {/* Renders a sub-header for the contact list section. */}
        
        <AddContact
          onAddContact={handleAddContact}
        />
        {/* Renders the AddContact component and passes the handleAddContact function as a prop for adding new contacts. */}
        
        <ScrollView>
        {/* Makes the contacts list scrollable using ScrollView. */}
        
          {contacts.map((contact, index) => (
          // Maps through the contacts array and renders a ContactCard for each contact.
          
            <ContactCard
              key={index}
              contact={contact}
              onDelete={() => handleDeleteContact(index)}
              onEdit={() => handleEditForm(index, contact)}
            />
            // Each ContactCard is passed the contact details and event handlers for deleting and editing the contact.
          ))}
        </ScrollView>
        
        {contacts.length === 0 && <Text style={styles.noContact}>No contacts added</Text>}
        {/* If there are no contacts in the list, display a message saying "No contacts added". */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Defines a collection of styles for the ContactManager component.

  containerForm: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    padding: 20,
    maxWidth: 400,
    width: '100%',
    // Defines the styling for the main container, including margin, background, shadow, padding, and size.
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    // Styles the main header, with bold text, center alignment, and large font size.
  },
  contactsList: {
    marginTop: 20,
    marginLeft: 5,
    // Adds margin to the contact list section.
  },
  contactsListHeader: {
    fontSize: 20,
    color: '#e91e63',
    marginBottom: 10,
    alignSelf: 'center'
    // Styles for the contacts list header, with custom color, size, and center alignment.
  },
  noContact: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
    // Styles for the "No contacts added" message, with muted color and centered alignment.
  },
});

export default ContactManager;
// Exports the ContactManager component as the default export for use in other parts of the app.
