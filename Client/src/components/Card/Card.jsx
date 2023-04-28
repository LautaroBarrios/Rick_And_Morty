import styles from "./Card.module.css"
import { Link } from "react-router-dom";
import { addFav, removeFav } from "../../redux/actions/actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

function Card({id, name, status, species, gender, origin, image, onClose, addFav, removeFav, myFavorites}) {

   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      if(isFav){
         setIsFav(false);
         removeFav(id)
      }else{
         setIsFav(true);
         addFav({id, name, status, species, gender, origin, image, onClose})
      }
   }

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   return (      
      <div className={styles.box}>
         <img className={styles.image} src={image} alt='' />
         <Link to={`/detail/${id}`}>
            <h2><p className={styles.nameChar}>{name}</p></h2>
         </Link>
         <h2>STATUS: {status}</h2>
         <h2>SPECIE: {species}</h2>
         <h2>GENDER: {gender}</h2>
         <h2>ORIGIN: {origin}</h2>
         <div className={styles.btn}>
            <button onClick={() => onClose(id)}>X</button>
         </div>
         <button onClick={handleFavorite}>{isFav ? '❤️' : '🤍'}</button>
      </div>
   );
}

const mapStateToProps = (state) => {
   return{
      myFavorites: state.myFavorites,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addFav: (character) => {dispatch(addFav(character))},
      removeFav: (id) => {dispatch(removeFav(id))}
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Card);