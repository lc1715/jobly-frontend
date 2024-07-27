import React from 'react'


const JobCard = ({ title, salary, equity, companyName }) => {

    return (
        <div>
            <h2>{title}</h2>
            <h4 className='mt-3'>{companyName}</h4>
            <p className='mt-4'>Salary: {salary}</p>
            <p className='mt-4'>Equity: {equity}</p>
        </div>
    )
}

export default JobCard;
