import React from "react"

class Footer extends React.Component {
    render (){
        return (
        <>
            <div id="foot-container">
                <div id="foot-logo">
                    <p>FOOTER LOGO</p>
                </div>

                <div id="foot-links">
                    <div id="foot-left-links">
                        <a href="/">link 1</a>
                        <a href="/">link 2</a>
                    </div>
                    <div id="foot-right-links">
                        <a href="/">link 3</a>
                        <a href="/">link 4</a>
                    </div>
                </div>

                <div id="subcribe-footer">
                    <form>
                        <input type="email" placeholder="email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>

            </div>
        </>
        )
    }
}

export default Footer