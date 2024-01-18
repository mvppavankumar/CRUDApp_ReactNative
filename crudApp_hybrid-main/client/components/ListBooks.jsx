import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput,ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Update the import to use 'Icon' from 'react-native-vector-icons/FontAwesome'
import CustomButton from './CustomButton';
import axios from 'axios';
import ipadress from './ipaddress';
const ListBooks = ({ route, navigation }) => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch books when the component mounts or reloadComponent changes
        fetchBooks();
    }, [[route.params?.refresh]]);
    const fetchBooks = async () => {
        try {
            const response = await axios.get(`http://${ipadress}:3301/books`);

            if (response.status === 200) {
                setBooks(response.data);
            } else {
                console.error('Failed to fetch books');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleEdit = (id) => {
        // Navigate to the EditBook screen with the book id as a parameter
        navigation.navigate('Edit', { bookId: id });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://${ipadress}:3301/books/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                ToastAndroid.show('Record deleted successfully', ToastAndroid.SHORT);
                // Update the state to remove the deleted book
                setBooks(books.filter((book) => book.id !== id));
            } else {
                ToastAndroid.show('Record cannot be deleted right now', ToastAndroid.SHORT);
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };
    const handleInputChange = (text) => {
        setSearchQuery(text);
        if (text === '') {
            // If input is empty, fetch all books
            fetchBooks();
        } else {
            // Perform live search
            handleSearch();
        }
    };
    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://${ipadress}:3301/books?search=${searchQuery}`);
            console.log('Search response:', searchQuery);

            if (response.status === 200) {
                setBooks(response.data);
            } else {
                console.error('Failed to fetch books');
            }
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };
    const handleAddClick = () => {
        navigation.navigate('Add'); // Navigate to the 'Other' screen
    };

    return (
        <View style={{flex:1, padding: 16, marginTop: 100 }}>
            <View style={{ backgroundColor: "#d8e8e9", paddingTop: 30, paddingBottom: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Book List</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                    <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
                        <Icon name="search" size={20} style={{ position: 'absolute', left: 10, color: 'gray' }} />
                        <TextInput
                            placeholder="Search books..."
                            style={{
                                borderWidth: 1,
                                borderRadius: 25,
                                padding: 12,
                                paddingLeft: 40,
                                borderColor: 'darkgray',
                                width: 200,
                                height: 40
                            }}
                            value={searchQuery}
                    onChangeText={handleInputChange}

                        />
                    </View>
                    <TouchableOpacity onPress={() => console.log('Search icon pressed')}>
                        <Icon name="ellipsis-v" size={20} />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <CustomButton
                    title="Last 30 Days"
                    color="white"
                    backgroundColors="black"
                    borderColors="black"
                    fontSize={14}
                    marginLefts={5}
                    paddingB={5}
                    marginBottoms={5}
                    iconName="caret-down"
                    iconSize={16}
                    onPress={() => console.log('Last 30 Days button pressed')}
                />

                <CustomButton
                    title="Filter"
                    color="white"
                    backgroundColors="black"
                    borderColors="black"
                    fontSize={14}
                    marginLefts={5}
                    paddingB={5}
                    marginBottoms={5}
                    iconName="caret-down"
                    iconSize={16}
                    onPress={() => console.log('Last 30 Days button pressed')}
                />
                <CustomButton
                    title="Add Book"
                    color="#3aaee8"
                    backgroundColors="white"
                    fontSize={14} // Adjust the font size as needed
                    alignRight={true} // Align to the right
                    marginBottoms={5}
                    onPress={handleAddClick}
                />
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: 20 }} />

            <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ marginBottom: 5 }}>{item.name}</Text>
                                <Text>{item.author}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => handleEdit(item.id)} style={{ marginRight: 10 }}>
                                    <Icon name="edit" size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                    <Icon name="trash" size={20} />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: 20 }} />
                    </View>
                )}
            />
        </View>


    );
};

export default ListBooks;
