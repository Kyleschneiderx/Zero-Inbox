import React, { useContext } from 'react';
import { View, StyleSheet} from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import {Context as EmailContext} from '../context/EmailContext';
import EmailForm from '../components/EmailForm';



const EmailSentScreen = () => {
    const { emails } = useContext(EmailContext);



    return(
        <SafeAreaView>
            <Text h2>Send Email</Text>
            <EmailForm
            onSubmit = {emails}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default EmailSentScreen;
