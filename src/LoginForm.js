import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import UserContext from './UserContext'
import Alert from './Alert'


const LoginForm = () => {
    const initialState =
    {
        username: '',
        password: ''
    }

    const [formData, setFormData] = useState(initialState)
    const [formErrors, setFormErrors] = useState([])

    const { userLogin } = useContext(UserContext)

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

        let result = await userLogin({ ...formData })

        if (result.success) {
            navigate('/')
        } else {
            setFormErrors(result.errors)
        }
    }

    return (
        <div className="LoginForm">
            <div className="container col-md-6 col-lg-4 mt-5">
                <div className="row">
                    <h2 className="mb-3">Log In</h2>
                    <div className="card">
                        <div className="card-body">

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor='username' className="form-label fw-bold">Username</label>
                                    <input className="form-control"
                                        id='username'
                                        type='text'
                                        name='username'
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='password' className="form-label fw-bold mt-3">Password</label>
                                    <input className="form-control"
                                        id='password'
                                        type='text'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                {formErrors.length ?
                                    <Alert type='danger' messages={formErrors} /> :
                                    null}

                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary mt-4">Submit</button>
                                </div>
                            </form >
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default LoginForm;
