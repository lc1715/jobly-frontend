import React, { useState, useContext } from 'react'

import UserContext from './UserContext'
import JoblyApi from './api'
import Alert from './Alert'


const ProfileForm = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const initialState =
    {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: ''
    }

    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);
    const [saveNewProfileConfirmed, setSaveNewProfileConfirmed] = useState(false);

    console.debug('formData', formData)


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setFormData((formData) => (
            {
                ...formData,
                [name]: value
            }
        ))

        setFormErrors([])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let updatedUser;

        try {
            updatedUser = await JoblyApi.updateProfile(currentUser.username, { ...formData })
            setFormData(formData => ({ ...formData, password: '' }))
        } catch (errors) {
            setFormErrors(errors)
            return;
        }

        setSaveNewProfileConfirmed(true);
        setCurrentUser(updatedUser);
    }


    return (
        < div className="PofileForm" >
            <div className="container col-md-6 col-lg-4 mt-5">
                <div className="row">
                    <h2 className="mb-3">Profile</h2>
                    <div className="card">
                        <div className="card-body">

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor='username' className="form-label fw-bold mt-3">Username</label>
                                    <input className="form-control"
                                        id='username'
                                        type='text'
                                        name='username'
                                        value={currentUser.username}
                                        disabled={true}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='firstName' className="form-label fw-bold mt-3">First Name</label>
                                    <input className="form-control"
                                        id='firstName'
                                        type='text'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='lastName' className="form-label fw-bold mt-3">Last Name</label>
                                    <input className="form-control"
                                        id='lastName'
                                        type='text'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='email' className="form-label fw-bold mt-3">Email</label>
                                    <input className="form-control"
                                        id='email'
                                        type='text'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='password' className="form-label fw-bold mt-3">Confirm password to make changes</label>
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
                                    null
                                }

                                {saveNewProfileConfirmed ?
                                    <Alert type='success' messages={['Profile has been updated']} /> :
                                    null
                                }

                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary mt-3">Submit</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div >
        </div >
    )

}

export default ProfileForm;

