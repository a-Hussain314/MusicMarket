import React, { useState } from 'react';
import PrimaryButton from '../Button/PrimaryButton'
import InvoiceHandler from '../../utilities/InvoiceHandler'
import styles from "./from.module.scss";

export default function SubmitRequest({ catrSongs, stepsNavigate, submit }) {

    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: ""
    })

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let totalPrice = InvoiceHandler.totalPrice(catrSongs);
        submit(user, totalPrice);
    }

    return (
        <>
            <form id="form" className={styles.form} onSubmit={onSubmit}>
                <input className={styles.submitInput} required id="name" value={user.name} onChange={onChange} type="text" placeholder="Name" />
                <input className={styles.submitInput} required id="email" value={user.email} onChange={onChange} type="email" placeholder="Email Address" />
                <input className={styles.submitInput} required id="mobile" value={user.mobile} onChange={onChange} type="number" placeholder="Mobile" />
            </form>
            <div className={styles.buttonsBox}>
                <PrimaryButton onClick={stepsNavigate.previous}>Previous</PrimaryButton>
                <PrimaryButton type="submit" form="form" value="Submit">Submit</PrimaryButton>
            </div>
        </>
    )
}
