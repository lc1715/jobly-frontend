import React, { useState } from 'react'


/**Form to filter companies by Company name*/

const CompanyListForm = ({ addQueryString }) => {
    const initialState = { name: '' }

    const [formData, setFormData] = useState(initialState)


    const handleChange = (evtObj) => {
        const name = evtObj.target.name
        const value = evtObj.target.value

        setFormData((formData) => (
            {
                ...formData,
                [name]: value
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addQueryString({ ...formData })
        setFormData(initialState)
    }


    return (
        <form onSubmit={handleSubmit} className="form-inline">
            <div className="input-group mb-3">
                <input className="form-control form-control-md flex-grow-1"
                    type='text'
                    name='name'
                    value={formData.name}
                    placeholder='Company Name'
                    onChange={handleChange}
                />
                <div className="input-group-append">
                    <button className="btn btn-md btn-primary">Search</button>
                </div>
            </div>
        </form>
    )
}

export default CompanyListForm;
