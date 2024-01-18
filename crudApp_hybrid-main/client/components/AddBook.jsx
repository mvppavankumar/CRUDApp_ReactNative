import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ToastAndroid, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from './CustomButton';
import axios from 'axios';
import ipadress from './ipaddress';

const AddBook = ({ navigation }) => {

    const [bookName, setBookName] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [addedBy, setAddedBy] = useState('');
    const handleAddBook = async () => {
        if (bookName == "") {
            return ToastAndroid.showWithGravityAndOffset(
                'Enter Book Name',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
                // Specify the background color for error (red in this case)
                { backgroundColor: '#FF5733' }
            );
            //return ToastAndroid.show("Please enter Name", 1000);
        }
        else if (bookAuthor == "") {
            return ToastAndroid.show("Please enter Auther Name", 1000);
        }
        else if (addedBy == "") {
            return ToastAndroid.show("Please enter your name", 1000);
        } else if (email == "") {
            return ToastAndroid.show("Please enter email", 1000);
        }
        else {
            try {
                const formData = {
                    bookName,
                    email,
                    bookAuthor,
                    addedBy,
                };

                const response = await axios.post(`http://${ipadress}:3301/addBooks`, formData);

                if (response.status === 200) {
                    ToastAndroid.show('Record saved successfully', ToastAndroid.SHORT);
                    navigation.navigate('Home', { refresh: true });
                } else {
                    console.error('Failed to add book');
                    ToastAndroid.show(result.message || 'Error saving record', ToastAndroid.SHORT);

                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    const handleCancel = () => {
        navigation.navigate('Home');
    };
    return (
        <View style={{ padding: 16, marginTop: 100 }}>
            <View style={styles.container}>
                <Text style={styles.heading}>Add Book</Text>
                <View style={styles.cardBody}>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Book Name:</Text>
                        <TextInput
                            style={styles.input}
                            value={bookName}
                            onChangeText={setBookName}
                            placeholder="Enter book name"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Book Author:</Text>
                        <TextInput
                            style={styles.input}
                            value={bookAuthor}
                            onChangeText={setBookAuthor}
                            placeholder="Enter book author"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email:</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Added By:</Text>
                        <TextInput
                            style={styles.input}
                            value={addedBy}
                            onChangeText={setAddedBy}
                            placeholder="Book Added by"
                        />
                    </View>


                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title="Add"
                            onPress={handleAddBook}
                            color="#3aaee8"
                        />
                        <CustomButton
                            title="Cancel"
                            onPress={handleCancel}
                            color="#3aaee8"

                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        backgroundColor: '#d8e8e9'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10
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
        borderRadius: 10, // Adjust the value as needed
        backgroundColor: 'white', // You may want to specify a background color
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
    button: {
        marginHorizontal: 8,
        paddingHorizontal: 200,
        fontSize: 20, // Adjust the fontSize as needed

    },
});


export default AddBook;