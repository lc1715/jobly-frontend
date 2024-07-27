import React, { useState, useEffect, useContext } from 'react'
import JoblyApi from './api'

import JobCard from './JobCard'
import JobListForm from './JobListForm'
import LoadSpinner from './LoadSpinner'
import UserContext from './UserContext'

import './JobsList.css'


const JobsList = () => {
    const [jobsArr, setJobsArr] = useState(null)
    const [queryStringParams, setQueryStringParams] = useState({})
    const [appliedJobs, setAppliedJobs] = useState({})

    const { currentUser } = useContext(UserContext)


    useEffect(() => {
        async function getAllJobs() {
            let jobs = await JoblyApi.getAllJobs(queryStringParams)
            setJobsArr(jobs)
        }

        getAllJobs()
    }, [queryStringParams])


    useEffect(() => {
        console.log('SecondUseEffectHookIsRunning')

        if (currentUser) {
            let obj = {}

            currentUser.applications.map((jobId) => {
                obj[jobId] = true
            })

            setAppliedJobs(obj)
        }
    }, [jobsArr])


    //Function to filter out jobs
    const addQueryString = (formDataQueryString) => {
        for (let propertyName in formDataQueryString) {
            if (formDataQueryString[propertyName] === '') {
                formDataQueryString[propertyName] = undefined
            }
        }

        setQueryStringParams({ ...formDataQueryString })
    }


    const handleApply = async (jobId) => {
        setAppliedJobs((jobIds) => (
            { ...jobIds, [jobId]: true }
        ))

        await JoblyApi.userApplyForJob(currentUser.username, jobId)
    }

    if (!jobsArr) {
        return (
            <LoadSpinner />
        )
    }

    return (
        <div className="JobsList">
            <div className="col-md-5 offset-md-3">
                <h1 className='text-center mb-5 mt-4'>Jobs</h1>
                <JobListForm addQueryString={addQueryString} />
            </div>

            {jobsArr.length === 0 ?
                <h4 className='CompanyListNoResults mt-5'>Sorry, no results were found</h4>
                :
                jobsArr.map(jobObj => {
                    return (
                        <div>
                            <div className='JobsList'>
                                <div className="container col-md-6 mt-4">
                                    <div className="row">
                                        <div className="card" style={{ width: '80rem' }}>
                                            <div className="card-body"></div>
                                            <JobCard
                                                key={jobObj.id}
                                                title={jobObj.title}
                                                salary={jobObj.salary}
                                                equity={jobObj.equity}
                                                companyHandle={jobObj.companyHandle}
                                                companyName={jobObj.companyName}
                                            />
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                                                <button onClick={() => handleApply(jobObj.id)} disabled={appliedJobs[jobObj.id]} className="JobsListButton btn btn-danger font-weight-bold text-uppercase float-right">
                                                    {appliedJobs[jobObj.id] ? 'Applied' : 'Apply'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div >
    )
}

export default JobsList;

