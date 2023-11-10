const React = require("react");
const ReactDom = require("react-dom");
const App = require("./App");
const { BrowserRouter } = require("react-router-dom");
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);