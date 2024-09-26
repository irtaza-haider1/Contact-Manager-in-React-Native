import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setEditForm } from '../contactsSlice';

interface AddContactProps {
  onAddContact: (contact: { name: string; email: string }) => void;
}

const AddContact: React.FC<AddContactProps> = ({ onAddContact }) => {
  const dispatch = useDispatch();
  const editForm = useSelector((state: RootState) => state.contacts.editForm);
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (editForm !== null && contacts[editForm]) {
      setName(contacts[editForm].name);
      setEmail(contacts[editForm].email);
    }
  }, [editForm]);

  const handleSubmit = () => {
    onAddContact({ name, email });
    setName('');
    setEmail('');
    setShowForm(false);
    dispatch(setEditForm(null));
  };

  return (
    <View style={styles.formContainer}>
      <TouchableOpacity style={styles.addContactButton} onPress={() => setShowForm(!showForm)}>
        <Text style={styles.addContactButtonText}>
          {editForm === null ? 'Add Contact' : 'Edit Contact'}
        </Text>
      </TouchableOpacity>

      {showForm && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>
            {editForm !== null ? 'Edit Contact' : 'Add Contact'}
          </Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter Name"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            keyboardType="email-address"
          />

          <Button title={editForm !== null ? 'Update' : 'Submit'} onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addContactButton: {
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
  },
  addContactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    maxWidth: 600,
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  formTitle: {
    color: '#e91e63',
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
});

export default AddContact;
