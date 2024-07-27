import React, { useState, useEffect } from 'react'
import JoblyApi from './api'

import CompanyCard from './CompanyCard'
import CompanyListForm from './CompanyListForm'
import LoadSpinner from './LoadSpinner'

import './CompanyList.css'


/**Shows all companies
 * 
 * On mount, loads companies from API.
 * 
 * Can use optional filter to filter out companies.
 *
 * This is routed to at '/companies'
 */
const CompanyList = () => {
    const [companyArr, setCompanyArr] = useState(null)
    const [queryStringParams, setQueryStringParams] = useState({})


    useEffect(() => {
        async function getCompanies() {
            let resp = await JoblyApi.getAllCompanies(queryStringParams)

            let companies = resp.companies
            setCompanyArr(companies)
        }

        getCompanies()
    }, [queryStringParams])


    const addQueryString = (formDataQueryString) => {
        for (let propertyName in formDataQueryString) {
            if (formDataQueryString[propertyName] === '') {
                formDataQueryString[propertyName] = undefined
            }
        }

        setQueryStringParams({ ...formDataQueryString })
    }

    if (!companyArr) {
        return (
            <LoadSpinner />
        )
    }

    return (
        <div className="CompanyList">
            <div className="col-md-5 offset-md-3">
                <h1 className='text-center mb-4 mt-3'>Companies</h1>

                <CompanyListForm addQueryString={addQueryString} />
            </div>

            {
                companyArr.length === 0 ?
                    <h4 className='CompanyListNoResults mt-5'>Sorry, no results were found</h4>
                    :
                    companyArr.map(company => <CompanyCard key={company.id} company={company} />)
            }
        </div>
    )
}

export default CompanyList;

