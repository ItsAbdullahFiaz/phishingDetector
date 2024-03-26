import { CommonActions } from "@react-navigation/native";

export const resetAndGo = (navigation: any, routeName: string, routeParams: any) => {
    if (navigation && !IsEmptyString(routeName)) {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: routeName,
                        params: routeParams || {},
                    },
                ],
            }),
        );
    }
};

export const IsEmptyString = (str: string) => {
    return str == '' || !str;
};