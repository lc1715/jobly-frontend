import React, { useEffect, useState } from 'react';

import { jwtDecode } from "jwt-decode";

import JoblyApi from './api';
import UserContext from './UserContext'
import useLocalStorage from './useLocalStorage';
import LoadSpinner from './LoadSpinner';


const UserProvider = ({ children }) => {
    const [token, setToken] = useLocalStorage('token')
    const [userInfoLoaded, setUserInfoLoaded] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)


    useEffect(() => {
        async function getUserProfileInfo() {
            if (token) {
                try {
                    const decodedUser = jwtDecode(token)

                    JoblyApi.token = token

                    let username = decodedUser.username
                    let userObj = await JoblyApi.getUserInfo(username)

                    setCurrentUser(userObj)
                } catch (err) {
                    console.error("UserProvider.js problem loading", err)
                    setCurrentUser(null)
                }
            }
            setUserInfoLoaded(true)
        }
        setUserInfoLoaded(false)
        getUserProfileInfo()
    }, [token])


    async function signUp(bodyObj) {
        try {
            let userToken = await JoblyApi.register(bodyObj)

            setToken(userToken)

            return { success: true }
        } catch (errors) {
            console.error('sign up failed', errors)

            return { success: false, errors }
        }
    }

    async function userLogin(bodyObj) {
        try {
            let userToken = await JoblyApi.login(bodyObj)

            setToken(userToken)

            return { success: true }
        } catch (errors) {
            console.error('login failed', errors)

            return { success: false, errors }
        }
    }

    function userLogOut() {
        setToken(null)
        setCurrentUser(null)
    }


    if (userInfoLoaded === false) {
        return <LoadSpinner />
    }

    return (
        <div className="App">
            <UserContext.Provider value={{ currentUser, setCurrentUser, signUp, userLogin, userLogOut }}>
                {children}
            </UserContext.Provider>
        </div>
    );
}

export default UserProvider;
