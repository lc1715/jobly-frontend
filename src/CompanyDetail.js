import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import JoblyApi from './api'

import JobCard from './JobCard'
import LoadSpinner from './LoadSpinner'

import './CompanyDetail.css'


/**Shows detail about a specific company and its jobs. Need to provide
 * handle of company to get detail about the specific company.
 * 
 * Routed at '/companies/:handle'
 * 
 * Routes -> CompanyDetail -> JobCard
 */
const CompanyDetail = () => {
    const [specificCompany, setSpecificCompany] = useState(null)
    const params = useParams()

    useEffect(() => {
        async function getCompanyDetail(handle) {

            let companyObj = await JoblyApi.getCompany(handle)

            setSpecificCompany(companyObj)
        }

        getCompanyDetail(params.handle)
    }, [params.handle])


    return (
        <div className='CompanyDetail'>
            {specificCompany ?
                <div>
                    <h2 className='CompanyDetailInfo mt-4'>{specificCompany.name}</h2>
                    <p className='CompanyDetailInfo'>{specificCompany.description}</p>
                    <h3 className='CompanyDetailInfo mt-5'>Jobs within this Company:</h3>
                    {specificCompany.jobs.map(jobObj =>
                        <div className="container col-md-6 mt-4">
                            <div className="row">

                                <div className="card" style={{ width: '80rem' }}>
                                    <div className="card-body">
                                        <JobCard
                                            key={jobObj.id}
                                            title={jobObj.title}
                                            salary={jobObj.salary}
                                            equity={jobObj.equity}
                                            companyName={specificCompany.name}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                :
                <LoadSpinner />
            }
        </div>
    )
}

export default CompanyDetail;
