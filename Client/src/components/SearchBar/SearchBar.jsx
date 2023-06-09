import style from "../SearchBar/SearchBar.module.css"
import { useState } from "react";

export default function SearchBar({onSearch}) {
   const [id,setId] = useState("")

   const handleChange = (event) => {
      setId(event.target.value)
   }

   return (
      <div className={style.container}>
         <input className={style.search} type='search' onChange={handleChange} value={id} placeholder="Buscar...."/>
         <button onClick={() => onSearch(id)}>SEARCH</button>
      </div>
   );
}
