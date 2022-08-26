// import Registration from "./Registration";
// import { Component } from "react";

// export default class ToLogIn extends Component {
//     constructor() {
//         super();
//         this.state = {
//             email: "",
//             password: "",
//         };
//     }

//     render() {
//         return <></>;
//     }
// }

const LoggedIn = function () {
    const handleLogOut = (e) => {
        console.log("✔✔✔✔✔✔✔");
        e.preventDefault();
        // console.log("clicked on submit button");
        fetch("/logout.json", {
            method: "POST",
        });
        location.replace("/login");
    };
    return (
        <>
            {/* <img
                className="backgroundPic"
                src="https://images.unsplash.com/photo-1587361144243-03f7925381ca?ixlib=rb-1.2.1&dl=emil-huang-j-iRFjHCs5o-unsplash.jpg&w=1920&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
            />
            <p>Hi you are logged in now.</p> */}
            <form
                onSubmit={(e) => {
                    handleLogOut(e);
                }}
            >
                <button className="LoogedInForm" type="submit">
                    Log Out
                </button>
            </form>
        </>
    );
};

export default LoggedIn;
