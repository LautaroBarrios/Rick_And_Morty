import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// const URL_BASE = "https://be-a-rym.up.railway.app/api/character";
// const API_KEY = "0c9fa9e3319e.4d79dcee3a811c72d5b2";

const Detail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState({});

    useEffect(() => {
      // axios(`${URL_BASE}/${id}?key=${API_KEY}`)
      axios(`http://localhost:3001/rickandmorty/character/${id}`)
        .then(response => response.data)
        .then(( data ) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setCharacter({});
     }, [id]);
     
    return(
        <div>
            <h2>{character?.name}</h2>
            <h2>{character?.status}</h2>
            <h2>{character?.species}</h2>
            <h2>{character?.gender}</h2>
            {/* <h2>{character?.origin}</h2> */}
            <h2>{character?.origin?.name}</h2>
            <img src={character?.image} alt={character?.name} />
        </div>
    )
}

export default Detail;
