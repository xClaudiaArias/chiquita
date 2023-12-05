import React from "react";
import Prod from "./prod";

const Search = () => {
    return (
        <>
            <div className="search-form">
                <form>
                    <input className="search-input" placeholder="SEARCH..."/>
                    <button type="submit">Search</button>
                </form>

                <div className="search-links">
                    <p>Try these searches:</p>
                    <ul>
                        <li><a href="/">link1</a></li>
                        <li><a href="/">link2</a></li>
                        <li><a href="/">link3</a></li>
                        <li><a href="/">link4</a></li>
                    </ul>
                </div>
            </div>


            <div className="search-results">
                <h1>RESULTS</h1>
                <div className="search-results__RESULTS">
                    <Prod />
                </div>

            </div>

        </>
    )
}

export default Search