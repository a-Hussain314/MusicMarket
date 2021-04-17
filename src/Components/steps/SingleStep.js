import React from 'react'
import styles from './SingleStep.module.scss'

export default function SingleStep({ name, isComplete }) {
    return (
        <li className={`${styles.step} ${isComplete && styles.complete}`}>
            <div className={styles.stepName}>
                <h4>{name}</h4>
            </div>
        </li>
    )
}
