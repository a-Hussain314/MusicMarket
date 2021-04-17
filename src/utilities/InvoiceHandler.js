const InvoiceHandler = {
    totalPrice: (items) => {
        return items.reduce((accumulator, item) => accumulator + item.price, 0);
    } 
}

export default InvoiceHandler;