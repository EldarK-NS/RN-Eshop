import React, { useState, useReducer, useCallback, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Button, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native'
import Input from '../../components/UI/Input';
import MyColors from '../../constants/MyColors';
import Card from './../../components/UI/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux'
import { signUp, login } from '../../store/actions/auth'



const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};
export default function AuthScreen(props) {
    const [isLoading, setIsloading] = useState(false)
    const [error, setError] = useState()
    const [isSignup, setIsSignup] = useState(false)

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occured', error, [{ text: 'Okay' }])
        }
    }, [error])

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = signUp(
                formState.inputValues.email,
                formState.inputValues.password)
        } else {
            action = login(
                formState.inputValues.email,
                formState.inputValues.password)
        }
        setError(null)
        setIsloading(true)
        try {
            await dispatch(action)
            props.navigation.navigate('Shop')
        } catch (err) {
            setError(err.message)
            setIsloading(false)
        }
    }

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState])

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={30} >
            <LinearGradient
                colors={['#ffedff', '#ffe3ff',]}
                style={styles.gradient}
            >
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id='email'
                            label='E-Mail'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorMText='Please enter a valid email address'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize='none'
                            errorText='Please enter a valid password'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading ? (<ActivityIndicator size='small' color={MyColors.primary} />) : (<Button
                                title={isSignup ? 'Sign Up' : 'Login'}
                                color={MyColors.primary}
                                onPress={authHandler} />)}
                            <Button
                                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                                color={MyColors.secondary}
                                onPress={() => { setIsSignup(prevState => !prevState) }} />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: '100%',
        padding: 20,
        // maxHeight: 400
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10

    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
