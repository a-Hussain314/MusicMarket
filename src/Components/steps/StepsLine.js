import React from 'react'
import styles from "./StepsLine.module.scss";
import SingleStep from './SingleStep'

export default function StepsLine({ steps }) {
    return (
        <ul className={styles.timeline}>
            {steps.map((step) => {
                return (
                    <SingleStep key={step.name} {...step} />
                )
            })}
        </ul>
    )
}
