import React from "react";

const Account = () => {
    return (
        <>
            <h1>PROFILE</h1>
            <div className="account-cont">
                <h2>Account information</h2>

                <div className="personal-information__form">
                    <h3>Personal information</h3>
                    <form>
                        <input type="text" placeholder="First name" />
                        <input type="text" placeholder="Last name" />
                        <input type="text" placeholder="Username" />
                        <input type="text" placeholder="Email" />
                        <button type="submit">Save</button>
                    </form>
                </div>

                <div className="password__form">
                    <h3>Password</h3>
                    <form>
                        <input type="text" placeholder="Password" />
                        <input type="text" placeholder="confirm password" />
                        <button type="submit">Save</button>
                    </form>
                </div>

                <div className="shipping-information__form">
                    <h3>Shipping Information</h3>
                    <form>
                        <input type="text" placeholder="Street" />
                        <input type="text" placeholder="Street2" />
                        <input type="text" placeholder="City" />
                        <input type="text" placeholder="State" />
                        <input type="text" placeholder="Country" />
                        <input type="text" placeholder="Zip code" />
                        <button type="submit">Save</button>
                    </form>
                </div>

                <div className="payment-information__form">
                    <h3>Payment Information</h3>
                    <form>
                    <input type="text" placeholder="Card Name" />
                        <input type="text" placeholder="Card Number" />
                        <input type="text" placeholder="CVV" />
                        <input type="text" placeholder="Expiration Date" />
                        <button type="submit">Save</button>
                    </form>
                </div>

            </div>

            <div className="account_wl-rv">
                <div className="account-wl">
                    <img src="" alt="1" />
                    <img src="" alt="2" />
                    <img src="" alt="3" />
                    <button>View all</button>
                </div>
                <div className="account-rv">
                    <img src="" alt="1" />
                    <img src="" alt="2" />
                    <img src="" alt="3" />
                    <button>View all</button>
                </div>
            </div>
        </>
    )
}

export default Account