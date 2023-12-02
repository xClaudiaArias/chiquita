import React from "react"
import Prod from "./prod"
import ShopByCategory from "./shop-by-cat"

const Gallery = () => {
    return (
        <>
        <h1>BABIES -- Dresses</h1>
            <section>
                <ShopByCategory />
            </section>
            <div id="container">
                <Prod />   
            </div>
        </>
    )
}

export default Gallery