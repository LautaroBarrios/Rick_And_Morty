import style from "../Nav/Nav.module.css"
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
const Nav = ({onSearch, setAccess}) => {
    const handleLogOut = () => {
        setAccess(false);
    }

    return (
        <div className={style.nav}>
            <div className={style.startItems}>
                <button className={style.btns}>
                    <Link to='/home'><p>HOME</p></Link>
                </button>
                <SearchBar onSearch={onSearch}/>
            </div>
            <div className={style.centerItems}>
                <button className={style.btns}>
                    <Link to='/favorites'><p>FAVORITES</p></Link>
                </button>
                <button className={style.btns}>
                    <Link to='/about'><p>ABOUT</p></Link>
                </button>
            </div>
            <div className={style.endItems}>
                <button className={style.btns} onClick={handleLogOut}>
                    <Link to='/'><p>LOG OUT</p></Link>
                </button>
            </div>
        </div>
    )
}

export default Nav;
