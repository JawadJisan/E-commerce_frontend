import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser, login } from "../actions/userAction";



export default function useAuthCheck() {

    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false)

    useEffect(() => {
        const localAuth = localStorage?.getItem('auth');
        if (localAuth) {
            const auth = JSON.parse(localAuth);
            if (auth?.accessToken && auth?.user) {
                dispatch(loadUser(auth?.user._id))
                // dispatch(loadUser('63ef586c4f8297cfafa05742c3c6'))
            }
            // setTimeout(() => {
            // }, 2000);
        }
        setAuthChecked(true)

    }, [dispatch, setAuthChecked]);
    return authChecked;
}
