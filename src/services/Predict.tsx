import validator from 'validator';
import { useToast } from '../hooks/useToast';

export const predictUrl = async (url: string, setLoading: Function, setPredictionStatus: Function, storeSwitch: boolean, setStorSwitch: Function) => {
    const showToast = useToast();

    try {
        setLoading(true);

        const response = await fetch('http://abdullahfiaz.pythonanywhere.com/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const result = await response.json();
        setLoading(false);

        if (result.prediction === 'bad') {
            setPredictionStatus(false);
            showToast('This is a potential phishing URL', 'errorToast', url)
        } else {
            setPredictionStatus(true);
            showToast('This URL is safe', 'successToast', url)
        }

        const updateSwitch = !storeSwitch
        setStorSwitch(updateSwitch)

    } catch (error) {
        setLoading(false);
        showToast('Error occurred while making the request', 'errorToast', url)
    }
};
