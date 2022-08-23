import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import LogIn from "./LogIn";
import ResetPassword from "./ResetPassword";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>
                Lets combine the different local flavors from 50 states of
                USA!!!
                {/* hier need the font-family */}
            </h1>

            <img
                className="backgroundPic"
                src="https://images.unsplash.com/photo-1599893326319-fdc6782b79d8?ixlib=rb-1.2.1&dl=divani-diva-HAwDdAi6Fho-unsplash.jpg&w=1920&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
            />
            {/* hier need the pic */}
            <BrowserRouter>
                <div className="welcomeDiv">
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/LogIn">
                        <LogIn />
                    </Route>
                    <Route path="/ResetPassword">
                        <ResetPassword />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}
