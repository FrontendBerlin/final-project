import { Component } from "react";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
            errors: {
                firstName: false,
                lastName: false,
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
    // TODO:
    // 1. render 4 input fields + button ✅
    // 2. capture the user's input and store it state ✅
    // 3. when the user clicks submits, we want to send that data to the server
    // 4. if something goes wrong, conditionally render an err msg
    // 5. if everything goes well, show them the logo
    handleSubmit(e) {
        const userData = {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password,
        };
        e.preventDefault();
        // console.log("clicked on submit button");
        fetch("/register.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data from POST /register.json: ", data);
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
                    Create Your Account To Make New Friends!!!
                </h1>
                {this.state.error && (
                    <p className="error">oops! something went wrong!</p>
                )}
                <div className="container">
                    <form
                        id="registration"
                        onSubmit={this.handleSubmit}
                        method="post"
                        action="/register.json"
                    >
                        <input
                            type="text"
                            name="first"
                            placeholder="First Name"
                            // value={this.state.first}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            type="text"
                            name="last"
                            placeholder="Last Name"
                            // value={this.state.last}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email-Adresse"
                            // value={this.state.email}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            // value={this.state.password}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <p className="registrationP">
                    If you are already a Member, you can login{" "}
                    <Link to="/login">hier</Link>{" "}
                </p>
            </>
        );
    }
}
