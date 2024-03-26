import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { resetAndGo } from '../../utils/Helpers';
import { useNavigation } from '@react-navigation/native';
import MainButton from '../../components/MainButton';
import CustomInput from '../../components/CustomInput';
import TextWithLink from '../../components/TextWithLink';
import MainHeading from '../../components/MainHeading';
import { useToast } from '../../hooks/useToast';
import MainContainer from '../../components/MainContainer';
import AppIcon from '../../components/AppIcon';

const LoginScreen = () => {
    // const [email, setEmail] = useState('testuser@gmail.com');
    // const [password, setPassword] = useState('12345678');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [disableLogin, setDisableLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation()
    const showToast = useToast();

    useEffect(() => {
        if (email && password) {
            setDisableLogin(false)
        } else {
            setDisableLogin(true)
            setInvalidCredentials(false)
            setInvalidEmail(false)
        }
    }, [email, password])


    const handleLogin = async () => {
        setIsLoading(true)
        setInvalidCredentials(false);
        setInvalidEmail(false);
        try {
            await auth().signInWithEmailAndPassword(email, password);
            setIsLoading(false)
            resetAndGo(navigation, 'MainStack', null)
        } catch (error: any) {
            setIsLoading(false)
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === "auth/invalid-credential") {
                setInvalidCredentials(true);
            } else if (errorCode === "auth/invalid-email") {
                setInvalidEmail(true);
            } else {
                showToast('Error', 'errorToast', errorCode)
            }
        }
    };

    return (
        <MainContainer>
            <AppIcon />
            <MainHeading heading='Login' />
            <CustomInput
                value={email}
                setValue={setEmail}
                placeholder='Email'
                secureTextEntry={false}
                textWrong={invalidEmail ? 'Invalid email' : invalidCredentials ? 'Invalid Credentials' : ''}
                bottomError={true}
            />
            <CustomInput
                value={password}
                setValue={setPassword}
                placeholder='Password'
                secureTextEntry
                textWrong=''
                bottomError={false}
            />
            <MainButton
                onPress={handleLogin}
                buttonText='Login'
                disableBtn={disableLogin}
                isLoading={isLoading}
            />
            <TextWithLink
                onPress={() => navigation.navigate('SignupScreen' as never)}
                text={`Don't have an account?`}
                buttonText='Signup'
            />
        </MainContainer>
    );
};

export default LoginScreen;
