import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import AddContact from './AddContact';
import ContactCard from './ContactCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addContact, editContact, deleteContact, setEditForm, toggleInfoScreen } from '../contactsSlice';

const ContactManager: React.FC = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const editForm = useSelector((state: RootState) => state.contacts.editForm);
  const showInfoScreen = useSelector((state: RootState) => state.contacts.showInfoScreen);

  const handleAddContact = (contact: { name: string; email: string }) => {
    if (editForm !== null) {
      dispatch(editContact({ index: editForm, contact }));
    } else {
      dispatch(addContact(contact));
    }
  };

  const handleEditForm = (index: number) => {
    dispatch(setEditForm(index));
  };

  const handleDeleteContact = (index: number) => {
    dispatch(deleteContact(index));
  };

  const handleInfoButton = () => {
    dispatch(toggleInfoScreen());
  };

  const handleHomeButton = () => {
    dispatch(toggleInfoScreen());
  };

  if (showInfoScreen) {
    // Information screen rendering
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeader}>Contact Information</Text>
        <ScrollView>
          {contacts.map((contact, index) => (
            <View key={index} style={styles.contactItem}>
              <Text style={styles.name}>Name: {contact.name}</Text>
              <Text style={styles.email}>Email: {contact.email}</Text>
            </View>
          ))}
        </ScrollView>
        <Button title="Back to Home" onPress={handleHomeButton} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Manager</Text>
      <AddContact onAddContact={handleAddContact} />
      <ScrollView>
        {contacts.map((contact, index) => (
          <ContactCard
            key={index}
            contact={contact}
            onDelete={() => handleDeleteContact(index)}
            onEdit={() => handleEditForm(index)}
          />
        ))}
      </ScrollView>
      {contacts.length === 0 && <Text style={styles.noContact}>No contacts added</Text>}

      {/* Icons section */}
      <View style={styles.iconContainer}>
        <Button title="Information" onPress={handleInfoButton} />
        <Button title="Home" onPress={handleHomeButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  noContact: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  infoHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contactItem: {
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
});

export default ContactManager;
