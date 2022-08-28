import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import LogIn from "./LogIn";
import ResetPassword from "./ResetPassword";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1 className="welcomeH1">
                Friendship marks a life even more deeply than love.
                {/* hier need the font-family */}
            </h1>

            <img
                className="backgroundPic"
                src="https://images.unsplash.com/photo-1560821829-18a5fbb8b4ce?ixlib=rb-1.2.1&dl=noorulabdeen-ahmad-MW_2Osq-yIE-unsplash.jpg&w=1920&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
            />
            {/* hier need the pic */}
            <BrowserRouter>
                <div id="welcomeDiv">
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
