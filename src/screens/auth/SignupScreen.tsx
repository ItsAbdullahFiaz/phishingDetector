import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { resetAndGo } from '../../utils/Helpers';
import auth from '@react-native-firebase/auth';
import MainHeading from '../../components/MainHeading';
import CustomInput from '../../components/CustomInput';
import MainButton from '../../components/MainButton';
import TextWithLink from '../../components/TextWithLink';
import MainContainer from '../../components/MainContainer';
import { useToast } from '../../hooks/useToast';
import AppIcon from '../../components/AppIcon';

const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [disableSignup, setDisableSignup] = useState(true);
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation()
    const showToast = useToast();

    useEffect(() => {
        if (email && password) {
            setDisableSignup(false)
        } else {
            setDisableSignup(true)
            setInvalidEmail(false)
        }
    }, [email, password])

    const handleSignup = async () => {
        setIsLoading(true)
        setInvalidEmail(false);

        try {
            await auth().createUserWithEmailAndPassword(email, password);
            setIsLoading(false)
            resetAndGo(navigation, 'LoginScreen', null)
        } catch (error: any) {
            setIsLoading(false)
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === "auth/invalid-email") {
                setInvalidEmail(true);
            } else {
                showToast('Error', 'errorToast', errorCode)
            }
        }
    };

    return (
        <MainContainer>
            <AppIcon />
            <MainHeading heading='Sign Up' />
            <CustomInput
                value={email}
                setValue={setEmail}
                placeholder='Email'
                secureTextEntry={false}
                textWrong={invalidEmail ? 'Invalid email' : ''}
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
                onPress={handleSignup}
                buttonText='Sign Up'
                disableBtn={disableSignup}
                isLoading={isLoading}
            />
            <TextWithLink
                onPress={() => resetAndGo(navigation, 'LoginScreen', null)}
                text={`Already have an account?`}
                buttonText='Login'
            />
        </MainContainer>
    );
};

export default SignupScreen;
