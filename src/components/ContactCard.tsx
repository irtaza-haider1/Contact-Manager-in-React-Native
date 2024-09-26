import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ContactCardProps {
  contact: { name: string; email: string };
  onDelete: () => void;
  onEdit: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onDelete, onEdit }) => {
  return (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        {/* Explicitly setting text color to ensure it's visible */}
        <Text style={[styles.name, { color: '#000' }]}>{contact.name}</Text>
        <Text style={[styles.email, { color: '#000' }]}>{contact.email}</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text>🗑️</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onEdit} style={styles.editButton}>
        <Text>✏️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  contactInfo: {
    flexGrow: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    // Explicitly setting color to black to prevent invisible text
    color: '#000',
  },
  email: {
    fontSize: 14,
    color: '#666', // You can keep this color if it's visible
  },
  deleteButton: {
    backgroundColor: 'transparent',
    color: '#e91e63',
    fontSize: 20,
  },
  editButton: {
    borderWidth: 0,
    backgroundColor: 'white',
    color: '#e91e63',
  },
});

export default ContactCard;
