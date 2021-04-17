import React from 'react'
import InvoiceHandler from '../../utilities/InvoiceHandler';
import styles from "./Invoice.module.scss";

export default function Invoice({ catrSongs }) {
    return (
        <div className={styles.invoice}>
            <h3>Receipt of Payment</h3>
            <p><span>Songs Count</span><span>{catrSongs.length}</span></p>
            <p><span>Total Price</span><span>{InvoiceHandler.totalPrice(catrSongs)}$</span></p>
        </div>
    )
}
