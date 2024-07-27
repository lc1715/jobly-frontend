import React from 'react'
import { Link } from 'react-router-dom'

import './CompanyCard.css'

/**Shows limited company information. If you click on the company, it will lead 
 * to more details about that company and the company's jobs. 
 * 
 * CompanyCard -> CompanyDetail
 */
const CompanyCard = ({ company }) => {

    return (
        <div className='CompanyCard'>
            <div className="container col-md-6 mt-4">
                <div className="row">
                    <div className="card" style={{ width: '80rem' }}>
                        <div className="card-body">
                            <Link to={`/companies/${company.handle}`} className='CompanyCardText'>
                                <h3>{company.name}</h3>
                                <p>{company.description}</p>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CompanyCard;
