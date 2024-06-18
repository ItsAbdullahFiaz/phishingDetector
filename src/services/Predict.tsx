import { useToast } from "../hooks";


export const predictUrl = async (url: string, setLoading: Function, setPredictionStatus: Function, storeSwitch: boolean, setStorSwitch: Function, responseErrorList: any) => {
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
            showToast(responseErrorList.phishing_url, 'errorToast', url)
        } else {
            setPredictionStatus(true);
            showToast(responseErrorList.safe_url, 'successToast', url)
        }

        const updateSwitch = !storeSwitch
        setStorSwitch(updateSwitch)

    } catch (error) {
        setLoading(false);
        showToast(responseErrorList.error_request, 'errorToast', url)
    }
};
