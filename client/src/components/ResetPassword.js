import { Component } from "react";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 1,
            message: "",
        };

        this.currentView = this.currentView.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    currentView() {
        // this method determines what the render!
        if (this.state.view === 1) {
            return (
                <form
                    id="resetpassword"
                    onSubmit={this.handleSubmit}
                    method="post"
                    action="/Resetpassword.json"
                >
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        id="email"
                        key={"email"}
                        onChange={this.handleChange}
                        required
                    />

                    <button type="submit">Send Code</button>

                    <Link to="/login">
                        Oh! You do remember your password. <br />
                        Click here to go back to Log in!
                    </Link>
                </form>
            );
        } else if (this.state.view === 2) {
            return (
                <div>
                    <h1>
                        View 2: two inputs (reset code, new pw), & one button
                        <p>{this.state.message}</p>
                    </h1>
                </div>
            );
        } else if (this.state.view === 3) {
            // remember to also add a link to login ;)
            return (
                <div>
                    <h1>success msg & link back to Login!</h1>
                </div>
            );
        }
    }

    render() {
        return <div>{this.currentView()}</div>;
    }
    handleChange(e) {
        console.log(
            "handleChange is running - user is typing in the input field"
        );
        console.log("e.target.value", e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    handleSubmit(e) {
        const userData = {
            email: this.state.email,
        };
        e.preventDefault();
        // console.log("clicked on submit button");
        fetch("/Resetpassword.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data from POST /Resetpassword.json: ", data);
                if (data.success == true) {
                    console.log("=========================>it is submitted");
                    this.setState({
                        view: 2,
                    });
                } else {
                    this.setState({
                        message: data.message,
                    });
                    alert(this.state.message);
                }
            })
            .catch((err) => {
                console.log("err in fetch/register.json", err);
            });
    }
}
