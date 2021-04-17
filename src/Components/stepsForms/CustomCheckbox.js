import React from 'react';
import styles from "./from.module.scss";

export default function CustomCheckbox(props) {
    return (
        <div className={styles.inputGroup}>
            <input {...props} />
            <label htmlFor={props.name}>{props.name}</label>
        </div>
    )
}
