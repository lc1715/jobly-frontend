import React, { useState } from 'react'


/**Form to filter jobs by job name or salary amount */

const JobListForm = ({ addQueryString }) => {
    const initialState = { title: '', minSalary: '' }

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
        <div className="CompanyList col-md-12">

            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input className="form-control form-control-md flex-grow-1"
                        type='text'
                        name='title'
                        value={formData.title}
                        placeholder='Search Job Title'
                        onChange={handleChange}
                    />

                    <span className="input-group-text">AND/OR</span>

                    <input className="form-control form-control-md flex-grow-1"
                        type='number'
                        name='minSalary'
                        min='0'
                        max='100000000'
                        value={formData.minSalary}
                        placeholder='Search Minimum Salary'
                        onChange={handleChange}
                    />

                    <div className="input-group-append">
                        <button className="btn btn-md btn-primary">Search</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default JobListForm;

