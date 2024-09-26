import React, { useState, useEffect } from 'react';

import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
// Imports React Native components for building the UI:
// - TouchableOpacity: A pressable component with fade animation.

import { useSelector, useDispatch } from 'react-redux';
// Imports two React Redux hooks:
// - useDispatch: Allows dispatching actions to the Redux store.
// - useSelector: Selects state from the Redux store.

import { RootState } from '../store';
// Imports the type definition for the global state of the Redux store.

import { setEditForm } from '../contactsSlice';
// Imports an action creator to reset or set the editing form state from the contactsSlice.

interface AddContactProps {
  onAddContact: (contact: { name: string; email: string }) => void;
}
// Defines TypeScript interface for props, ensuring the component expects an 'onAddContact' function 
// that accepts a contact object with 'name' and 'email' fields.

const AddContact: React.FC<AddContactProps> = ({ onAddContact }) => {
// Declares the AddContact component as a functional component that accepts props defined by AddContactProps.

  const dispatch = useDispatch();
  // Initializes the dispatch function to trigger Redux actions.

  const editForm = useSelector((state: RootState) => state.contacts.editForm);
  // Selects the editForm state from the Redux store (indicating if a contact is being edited).

  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  // Selects the contacts list from the Redux store.

  const [name, setName] = useState<string>('');
  // Declares the 'name' state variable to hold the name input, with an initial value of an empty string.

  const [email, setEmail] = useState<string>('');
  // Declares the 'email' state variable to hold the email input, with an initial value of an empty string.

  const [showForm, setShowForm] = useState<boolean>(false);
  // Declares the 'showForm' state variable to control whether the form is shown or hidden, defaulting to false.

  useEffect(() => {
    if (editForm !== null && contacts[editForm]) {
      // If the editForm is not null (meaning we are editing a contact) and the contact at the editForm index exists:

      setName(contacts[editForm].name);
      // Sets the 'name' state to the contact's name being edited.

      setEmail(contacts[editForm].email);
      // Sets the 'email' state to the contact's email being edited.
    }
  }, [editForm]);
  // The useEffect hook will run whenever the 'editForm' state changes, pre-filling the form with the contact info when editing.

  const handleSubmit = () => {
    onAddContact({ name, email });
    // Calls the onAddContact function passed in via props to add or update the contact.

    setName('');
    // Resets the 'name' state to an empty string after submission.

    setEmail('');
    // Resets the 'email' state to an empty string after submission.

    setShowForm(false);
    // Hides the form after submission.

    dispatch(setEditForm(null));
    // Dispatches an action to reset the editForm state, ending the edit mode.
  };

  return (
    <View>
    {/* Main container wrapping the button and form components. */}

      <TouchableOpacity style={styles.addContactButton} onPress={() => setShowForm(!showForm)}>
      {/* Renders a button to toggle the form visibility. The button style is defined by addContactButton. */}
      
        <Text style={styles.addContactButtonText}>
        {/* Button label text, displaying 'Add Contact' or 'Edit Contact' based on whether editForm is set. */}
        
          {editForm === null ? 'Add Contact' : 'Edit Contact'}
        </Text>
      </TouchableOpacity>

      {showForm && (
      // If 'showForm' is true, the form fields are displayed.
      
        <View style={styles.formContainer}>
        {/* Container wrapping the form fields, styled using formContainer. */}
        
          <Text style={styles.formTitle}>
          {/* Displays either "Add Contact" or "Edit Contact" as the form title depending on the editForm state. */}
          
            {editForm !== null ? 'Edit Contact' : 'Add Contact'}
          </Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter Name"
          />
          {/* Text input for the contact's name, using the 'name' state and onChangeText to update it. */}
          
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            keyboardType="email-address"
          />
          {/* Text input for the contact's email, using the 'email' state and onChangeText to update it.
              The keyboard is set to the email type. */}

          <Button title={editForm !== null ? 'Update' : 'Submit'} onPress={handleSubmit} />
          {/* Button to submit the form, either as "Update" (if editing) or "Submit" (if adding). 
              The handleSubmit function is called on press. */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Defines the styles for the AddContact component.

  addContactButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    // Styles for the button that toggles the form, with dark background, padding, border radius, and centered text.
  },
  addContactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    // Styles for the button text: white color, bold font, and a size of 16.
  },
  formContainer: {
    maxWidth: 600,
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    // Styles for the form container: dark background, padding, border radius, and a max width.
  },
  formTitle: {
    color: '#e91e63',
    fontSize: 20,
    marginBottom: 20,
    // Styles for the form's title text, using pink color, large font, and bottom margin.
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    // Styles for the text inputs: padding, border, light background, and rounded corners.
  },
});

export default AddContact;
// Exports the AddContact component to be used in other parts of the application.
