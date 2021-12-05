import React, { useContext, useState, useEffect } from 'react'
import MyContext from '../context/MyContext'
import './More.css'
import ReactPaginate from 'react-paginate';

export default function More() {
    const { profiles, setProfiles, searchValue, setSearchValue, filtered, setFiltered } = useContext(MyContext);
    //const [orderArray,setOrderArray]=useState([])
    const [count, setCount] = useState(0)
    const handlePageClick = (data) => {

        
        let a = 4 * data.selected
        setCount(a)

    }

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
        setCount(0)


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
   

    const nameAsc=()=>{

       let myData= filtered.sort(function(a, b){
            var nameA=a.Name_Surname.toLowerCase(), nameB=b.Name_Surname.toLowerCase();
            if (nameA < nameB) 
             return -1;
            if (nameA > nameB)
             return 1;
            return 0; 
           });
       
        setFiltered(myData)
    }
    const nameDesc=()=>{
        const myData=filtered
        .sort(function(a, b){
            var nameA=a.Name_Surname.toLowerCase(), nameB=b.Name_Surname.toLowerCase();
            if (nameA < nameB) 
             return 1;
            if (nameA > nameB)
             return -1;
            return 0; 
           });
        setFiltered(myData)
    }
   
    return (
        <div>

            <img src="https://tesodev.github.io/jqueryLite/img/tesodevVector.png" alt="" className='headerImg' />
            <form onSubmit={handleSubmit} id='form'>
                <input type="text" className='searchInput' value={searchValue} onChange={handleChange} />
                <button type='submit' className='searchButton'><p id='searchText'>Search</p></button>
            </form>
            <div class="dropdown" id='order'>
                <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id='orderBtn'>
                    Order By
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button class="dropdown-item" href='#' role='button' aria-haspopup='true' aria-expanded='false' onClick={nameAsc}>Name ascending</button>
                    <button class="dropdown-item" href='#' role='button' aria-haspopup='true' aria-expanded='false' onClick={nameDesc}>Name descending</button>
                    
                </div>
            </div>

            <div id="content">
                {filtered &&
                    <><div className='listDiv'>
                        <div>
                            <p className='listCountry'>{filtered[count]?.City}</p>
                            <p className='listName'>{filtered[count]?.Name_Surname}</p>
                            <p className='listEmail'>{filtered[count]?.Email}</p>

                        </div>{filtered[count] ? <hr className='hr' /> : ''}
                    </div><div className='listDiv'>
                            <div>
                                <p className='listCountry'>{filtered[count + 1]?.City}</p>
                                <p className='listName'>{filtered[count + 1]?.Name_Surname}</p>
                                <p className='listEmail'>{filtered[count + 1]?.Email}</p>

                            </div>{filtered[count + 1] ? <hr className='hr' /> : ''}
                        </div><div className='listDiv'>
                            <div>
                                <p className='listCountry'>{filtered[count + 2]?.City}</p>
                                <p className='listName'>{filtered[count + 2]?.Name_Surname}</p>
                                <p className='listEmail'>{filtered[count + 2]?.Email}</p>

                            </div>{filtered[count + 2] ? <hr className='hr' /> : ''}
                        </div><div className='listDiv'>
                            <div>
                                <p className='listCountry'>{filtered[count + 3]?.City}</p>
                                <p className='listName'>{filtered[count + 3]?.Name_Surname}</p>
                                <p className='listEmail'>{filtered[count + 3]?.Email}</p>

                            </div>{filtered[count + 3] ? <hr className='hr' /> : ''}
                        </div></>
                }



            </div>
            <ReactPaginate
                containerClassName='pagination justify-content-center'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                activeClassName='active'
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                previousLabel=" Previous"
                pageCount={Math.ceil(filtered.length / 4)}
                marginPagesDisplayed={5}
                pageRangeDisplayed={5}

            />
         </div>
    )
}

