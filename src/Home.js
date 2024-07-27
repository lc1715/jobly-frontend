import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import UserContext from './UserContext';

import './Home.css'


const Home = () => {
    const { currentUser } = useContext(UserContext)

    return (
        <div className='Home'>
            <div className="container text-center">
                <h1 className='fw-bold'>Jobly</h1>
                <h3 className='fw-bold mt-5 mb-2'>All the jobs in one, convenient place</h3>

                {currentUser ?
                    <h2 className="mt-4">{`Welcome back, ${currentUser.username}!`}</h2>
                    :
                    <p>
                        <Link to='/login' type="button" className="btn btn-primary me-3 mt-3">Login</Link>
                        <Link to='/signup' type="button" className="btn btn-primary mt-3" >Sign Up</Link>
                    </p>
                }
            </div>
        </div>
    )
}

export default Home;
