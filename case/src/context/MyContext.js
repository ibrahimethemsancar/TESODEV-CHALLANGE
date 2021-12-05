import { createContext,useState } from "react";

const MyContext =createContext();

export const MyProvider=({children})=>{
    const [profiles, setProfiles] = useState([])
    const [filtered, setFiltered] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const values={
        profiles,
        setProfiles,
        filtered,
        setFiltered,
        searchValue,
        setSearchValue
    }
    return <MyContext.Provider value={values}>{children}</MyContext.Provider>
}
export default MyContext;