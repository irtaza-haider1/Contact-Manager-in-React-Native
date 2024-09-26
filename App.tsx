import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store'; 
import ContactManager from './src/components/ContactManager';
import { View, StyleSheet } from 'react-native';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <ContactManager />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
