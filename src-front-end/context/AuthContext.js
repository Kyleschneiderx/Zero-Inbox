import { AsyncStorage } from 'react-native';
import CreateDataContext from './CreateDataContext';
import emailerApi from '../api/email';
import { navigate } from '../navigationRef';


const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error': 
            return {...state, errorMessage: action.payload}
        case 'signin':
            return {errorMessage: '', token: action.token}
        case 'clear_error_message':
            return {...state, errorMessage: ''}
        case 'signout':
            return {token: null, errorMessage: ''}
        default: 
            return state;
    }
};

const tryLocalSignin = dispatch => async () =>{
    const token = await AsyncStorage.getItem('token');
    if(token){
        dispatch({type: 'signin', payload: token});
        navigate('EmailSend');
    }else{
        navigate('Signup');
    }
};

const clearErrorMessage = dispatch => () =>{
    dispatch({type: 'clear_error_message'});
};

const signup = dispatch => async ({email, password}) =>{
    try{
        const response = await emailerApi.post('/signup', {email, password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload:response.data.token});

        navigate('EmailSend');
    }catch(err){
        dispatch({type: 'add_error', payload: 'Something went wrong with Sign Up'});
    }

};


const signin = dispatch => async({email, password}) =>{
    try{
        const response = await emailerApi.post('/signin', {email, password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload:response.data.token});

        navigate('EmailSend');
    }catch(err){
        dispatch({type: 'add_error', payload: 'Something went wrong with Sign In'});
    }
};

const signout = dispatch => async () =>{
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});
    navigate('loginFlow');
};






export const { Provider, Context } = CreateDataContext(
    authReducer,
    { signup, clearErrorMessage, signin, signout, tryLocalSignin },
    {token: null, errorMessage: ''}
);