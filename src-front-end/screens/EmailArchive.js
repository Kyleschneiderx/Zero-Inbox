import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';


const EmailArchive = ({navigation}) => {
    return <>
    <Text style= {{fontSize: 48}}>EmailArchive</Text>
    <Button title='Go to Detail Screen' onPress= {() => navigation.navigate('EmailDetail')}/>
    </>
};

const styles = StyleSheet.create({});

export default EmailArchive;
