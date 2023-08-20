import { createContext, useState, useContext, useEffect } from "react"
import { LocalStorageKeys, hasAccess } from "../utils/shared";
import { useLocation, useNavigate } from "react-router-dom";

const initialUserValues = {
    firstName: "",
    lastName: "",
    email: "",
    roleId: 0,
    password: "",
    cpassword: ""
}


const initialValues = {
    user: initialUserValues,
    setUser: () => { },
    logOut: () => { }
}

const authContext = createContext(initialValues);

const AuthWrapper = ({ children }) => {
    const [user, _setUser] = useState(initialUserValues);
    const navigate = useNavigate();
    const { pathName } = useLocation();
    //checking for if user close tab after open the tab then if localstorage has available userdetail or not? if available then log in through these details.
    useEffect(() => {
        const existingUser = JSON.parse(localStorage.getItem(LocalStorageKeys.USER)) || initialValues;
        if (!existingUser.id) {
            navigate('/login');
        }
        else {
            navigate('/')
            _setUser(existingUser);
        }
    }, [])

    //after path changing by user check whether user has access or not
    useEffect(() => {
        const existingUser = JSON.parse(localStorage.getItem(LocalStorageKeys.USER)) || initialValues;
        if (!existingUser.id)
            navigate('/login');
        else {
            if (!hasAccess(pathName, existingUser.roleId)) {
                navigate('/');
                console.log('You have not access this page');
            }

        }
    }, [pathName, user])


    const setUser = (userDetails) => {
        _setUser(userDetails);
        localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(userDetails))
    }

    const logOut = () => {
        _setUser(initialUserValues);
        localStorage.removeItem(LocalStorageKeys.USER);
    }
    return (
        <authContext.Provider value={{
            user,
            setUser,
            logOut
        }}>
            {children}
        </authContext.Provider>
    )
}
export const useAuthContext = () => {
    return useContext(authContext);
}

export default AuthWrapper;