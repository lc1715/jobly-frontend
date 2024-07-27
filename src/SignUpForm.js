import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import UserContext from './UserContext'
import Alert from './Alert'


const SignUpForm = () => {
    const initialState =
    {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    }

    const [formData, setFormData] = useState(initialState)
    const [formErrors, setFormErrors] = useState([])

    const { signUp } = useContext(UserContext)
    const navigate = useNavigate()


    const handleChange = (evtObj) => {
        const { name, value } = evtObj.target

        setFormData((formData) => (
            {
                ...formData,
                [name]: value
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let result = await signUp({ ...formData })

        if (result.success) {
            navigate('/')
        } else {
            setFormErrors(result.errors)
        }
    }

    return (
        < div className="LoginForm" >
            <div className="container col-md-6 col-lg-4 mt-5">
                <div className="row">
                    <h2 className="mb-3">Sign Up</h2>
                    <div className="card">
                        <div className="card-body">

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor='username' className="form-label fw-bold mt-2">Username</label>
                                    <input className="form-control"
                                        id='username'
                                        type='text' Name
                                        name='username'
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='password' className="form-label fw-bold mt-4">Password</label>
                                    <input className="form-control"
                                        id='password'
                                        type='text'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='firstName' className="form-label fw-bold mt-4">First Name</label>
                                    <input className="form-control"
                                        id='firstName'
                                        type='text'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='lastName' className="form-label fw-bold mt-4">Last Name</label>
                                    <input className="form-control"
                                        id='lastName'
                                        type='text'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='email' className="form-label fw-bold mt-4">Email</label>
                                    <input className="form-control"
                                        id='email'
                                        type='text'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                {formErrors.length ?
                                    <Alert type='danger' messages={formErrors} /> :
                                    null}

                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary mt-3">Submit</button>
                                </div>
                            </form >

                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default SignUpForm;

