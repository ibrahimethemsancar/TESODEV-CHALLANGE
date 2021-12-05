import React, { useState, useEffect, useContext } from 'react'
import './mainPage.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import More from './More'
import MyContext from '../context/MyContext';
function MainPage() {

    const {profiles,setProfiles,searchValue,setSearchValue,filtered,setFiltered}=useContext(MyContext)
    
    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }
    const filterProfile = () => {
        let results = profiles.filter(function (item) {
            return item.Name_Surname.toLowerCase().includes(searchValue)
        })
        setFiltered(results)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        filterProfile()

    }
    const getProfiles = async () => {
        const api_call = await fetch('http://localhost:3004/profiles');
        const response = await api_call.json()
        setProfiles(response)

    }
    useEffect(() => {
        getProfiles()
    }, [])

    useEffect(() => {
        setFiltered([])
    }, [searchValue])

    

    return (
        <>
            <div className='head'>
                <img src="https://tesodev.github.io/jqueryLite/img/tesodevVector.png" alt="" id='headerImg' />
            </div><br />
            <p id='rightText'>Search web app</p>
            <form onSubmit={handleSubmit}>
                <input type="text" id='searchInput' value={searchValue} onChange={handleChange} />
                <button type='submit' id='searchButton'><p id='searchText'>Search</p></button>
            </form>
            <div className="content">

                {
                    filtered &&
                    <><div className='listDiv'>
                        <div>
                            <p className='listCountry'>{filtered[0]?.City}</p>
                            <p className='listName'>{filtered[0]?.Name_Surname}</p>
                            <p className='listEmail'>{filtered[0]?.Email}</p>

                        </div>{filtered[0] ? <hr className='hr' /> : ''}
                    </div>
                        <div className='listDiv'>
                            <div>
                                <p className='listCountry'>{filtered[1]?.City}</p>
                                <p className='listName'>{filtered[1]?.Name_Surname}</p>
                                <p className='listEmail'>{filtered[1]?.Email}</p>

                            </div>{filtered[1] ? <hr className='hr' /> : ''}
                        </div>

                        <div className='listDiv'>
                            <div>
                                <p className='listCountry'>{filtered[2]?.City}</p>
                                <p className='listName'>{filtered[2]?.Name_Surname}</p>
                                <p className='listEmail'>{filtered[2]?.Email}</p>

                            </div>{filtered[2] ? <hr className='hr' /> : ''}
                        </div>

                        <Link to='/More' className='ShowMore'>Show More</Link>
                    </>


                }


            </div>



            
        </>
        
    )
}
export default MainPage
