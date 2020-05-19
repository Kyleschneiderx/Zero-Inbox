import React, { useState, useContext } from 'react';
import  { Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as EmailContext} from '../context/EmailContext';


const EmailForm =  ({onSubmit}) => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');


    return (
    <>
        <Spacer>
            <Input 
            placeholder = 'Subject'
            lable = 'Subject'
            value = {subject}
            onChangeText={setSubject}
            />
        </Spacer>
        <Spacer>
            <Input 
            placeholder = 'Message'

            value = {message}
            onChangeText={setMessage}
            />
        </Spacer>
        <Spacer>
            <Button title = 'Send' onPress={() => onSubmit({subject, message})}/>
        </Spacer>
    </>
    );
};



export default EmailForm;