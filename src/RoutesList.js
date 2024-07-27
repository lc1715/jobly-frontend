import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './Home'
import CompanyList from './CompanyList'
import CompanyDetail from './CompanyDetail'
import JobsList from './JobsList'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import ProfileForm from './ProfileForm'
import ProtectedRoute from './ProtectedRoute'


const RoutesList = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignUpForm />} />
            <Route path='/logout' element={<Home />} />

            <Route path='/companies'
                element={
                    <ProtectedRoute>
                        <CompanyList />
                    </ProtectedRoute>
                }
            />

            <Route path='/companies/:handle'
                element={
                    <ProtectedRoute>
                        <CompanyDetail />
                    </ProtectedRoute>
                }
            />

            <Route path='/jobs'
                element={
                    <ProtectedRoute>
                        <JobsList />
                    </ProtectedRoute>
                }
            />

            <Route path='/profile'
                element={
                    <ProtectedRoute>
                        <ProfileForm />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default RoutesList;

