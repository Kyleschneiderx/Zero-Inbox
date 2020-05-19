import createDataContext from './CreateDataContext';
import { AsyncStorage } from 'react-native';
import emailerApi from '../api/email';



const emailReducer = (state, action) => {
    switch (action.type) {
        case 'add_error': 
            return {...state, errorMessage: action.payload}
        case 'sendmail':
            return {...state , message: action.payload, subject: action.payload}
        case 'clear_error_message':
            return {...state, errorMessage: ''}
        case 'reset':
            return { ...state, subjuct: '', message: ''}
        default:
            return state;
        
    }

};

const emails = dispatch => async ({subject, message}) =>{
   console.log(subject)
   console.log(message)
    try{
        const response = await emailerApi.post('/emails', {subject, message});
        console.log(response.data)
        // dispatch({type: 'sendmail', payload: message, payload: subject})


    }catch(err){
        console.log(err.message)
    }


};

// const reset = dispatch => () => {
//     dispatch({type: 'reset'}) 
// };


export const { Context, Provider } = createDataContext(
    emailReducer,
    {emails},
    {subject: '', message: '',  errorMessage: '' }

);