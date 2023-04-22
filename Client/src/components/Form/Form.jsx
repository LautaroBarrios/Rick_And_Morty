import styles from "./Form.module.css"
import { useState } from "react";
import validation from "../Validation/Validation";

const Form = ({login}) => {
    const [ errors, setErrors] = useState({
    })

    const [ userData, setUserData] = useState({
        email : '',
        password : '',
    })

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })

        setErrors(validation({
            ...userData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login(userData);
    }

    return (
        <div className={styles.box}>
            <form onSubmit={handleSubmit}>
                <h2>Sing In</h2>
                <div className={styles.inputBox}>
                    <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email"/>
                    
                    {errors.email && <p className={styles.errors}>{errors.email}</p>}
                </div>
                <div className={styles.inputBox}>
                    <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password"/>
                    
                    {errors.password && <p className={styles.errors}>{errors.password}</p>}
                </div>
                <br/>
                <button>LOGIN</button>
            </form>
        </div>
    )
}

export default Form;