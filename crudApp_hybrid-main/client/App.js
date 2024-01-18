import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import AddBook from './components/AddBook';
import ListBooks from './components/ListBooks';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditBook from './components/EditBook';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer styles={styles.container}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Hide the header for all screens
        }}
      >        
        <Stack.Screen name="Home" component={ListBooks} />
        <Stack.Screen name="Add" component={AddBook} />
        <Stack.Screen name="Edit" component={EditBook} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop:100
  },
})


export default App;
