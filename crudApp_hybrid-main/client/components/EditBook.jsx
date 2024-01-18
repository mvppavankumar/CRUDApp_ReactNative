import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ToastAndroid } from 'react-native';
import CustomButton from './CustomButton';
import axios from 'axios';
import ipadress from './ipaddress';

const EditBook = ({ route, navigation }) => {
    const { bookId } = route.params;
    const [book, setBook] = useState({
        id: '',
        bookName: '',
        bookAuthor: '',
        email: '',
        addedBy: '',
    });

    useEffect(() => {
        // Fetch book details by ID when the component mounts
        fetchBookById();
    }, []);

    const fetchBookById = async () => {
        try {
            const response = await axios.get(`http://${ipadress}:3301/books/${bookId}`);
            if (response.status === 200) {
                const fetchedBook = response.data[0];
                setBook({
                    bookName: fetchedBook.name,          // Update to use correct field name
                    bookAuthor: fetchedBook.author,      // Update to use correct field name
                    email: fetchedBook.email,
                    addedBy: fetchedBook.added_by,       // Update to use correct field name
                });
            } else {
                console.error('Failed to fetch book details');
                ToastAndroid.show('Error fetching book details', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateBook = async () => {
        try {
            const response = await axios.put(`http://${ipadress}:3301/books/${bookId}`, {
                bookName: book.bookName,
                bookAuthor: book.bookAuthor,
                email: book.email,
                addedBy: book.addedBy,
            });

            if (response.status === 200) {
                ToastAndroid.show('Record saved successfully', ToastAndroid.SHORT);
                // Navigate back to the Home screen or perform any other desired action
                navigation.navigate('Home', { refresh: true });
            } else {
                console.error('Failed to update book');
                // Handle the error scenario, display a message, etc.
            }
        } catch (error) {
            ToastAndroid.show(result.message || 'Error saving record', ToastAndroid.SHORT);
            // Handle the error scenario, display a message, etc.
        }
    };

    const handleCancel = () => {
        // Navigate back to the Home screen without making any updates
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Edit Book</Text>
            <View style={styles.cardBody}>
                {/* Render input fields for editing */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Book Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={book.bookName}  // Use correct field name
                        onChangeText={(value) => setBook({ ...book, bookName: value })}  // Use correct field name
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Book Author:</Text>
                    <TextInput
                        style={styles.input}
                        value={book.bookAuthor}  // Use correct field name
                        onChangeText={(value) => setBook({ ...book, bookAuthor: value })}  // Use correct field name
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={book.email}
                        onChangeText={(value) => setBook({ ...book, email: value })}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Added By:</Text>
                    <TextInput
                        style={styles.input}
                        value={book.addedBy}  // Use correct field name
                        onChangeText={(value) => setBook({ ...book, addedBy: value })}  // Use correct field name
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <CustomButton title="Update" onPress={handleUpdateBook} color="#3aaee8" />
                    <CustomButton title="Cancel" onPress={handleCancel} color="#3aaee8" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: 100,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
    },
    cardBody: {
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
});

export default EditBook;
