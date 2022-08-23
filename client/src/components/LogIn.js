// import Registration from "./Registration";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {
                email: false,
                password: false,
            },
        };
        // One way to bind 'this
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        console.log(
            "handleChange is running - user is typing in the input field"
        );
        console.log("e.target.value", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
    }
    handleSubmit(e) {
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        e.preventDefault();
        // console.log("clicked on submit button");
        fetch("/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data from POST /login.json: ", data);
                if (data.success == true) {
                    location.reload();
                } else {
                    console.log("state of success is:", data.success);
                    this.setState({
                        errorMessage: data.success,
                    });
                }
                // TODO:
                // if registration was NOT successful -> render err conditionally
                // if registration WAS successful -> reload the page! trigger page reload to rerun start.js and we should end up se
            })
            .catch((err) => {
                console.log("err in fetch/register.json", err);
                // if something goes wrong => render an error
            });
    }
    render() {
        return (
            <>
                <h1 className="registrationH1">
                    Is it already a famous local flavor in USA?
                </h1>
                {this.state.error && (
                    <p className="error">oops! something went wrong!</p>
                )}
                <div className="container">
                    <form
                        id="registration"
                        onSubmit={this.handleSubmit}
                        method="post"
                        action="/login.json"
                    >
                        <input
                            type="text"
                            name="email"
                            placeholder="Number of the State"
                            // value={this.state.email}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            // value={this.state.password}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button type="submit">Log in</button>
                    </form>
                </div>
                <p className="registrationP">
                    You can go back to register <Link to="/">hier</Link>{" "}
                </p>
            </>
        );
    }
}
