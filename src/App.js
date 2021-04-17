import React from 'react';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./pages/Home";

import "./styles/global.scss"
import "./layout/layout.scss";

function App() {
    return (
        <>
            <Header />
            <main className="appMain">
                <Home />
            </main>
            <Footer />
        </>
    );
}

export default App;
