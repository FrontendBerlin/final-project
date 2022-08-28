import { Component } from "react";
import { Link } from "react-router-dom";
import Uploader from "./Uploader.js";
import { BrowserRouter, Route } from "react-router-dom";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaShowing: false,
            bio: "",
            profilePicUrl: "",
            uploaderIsVisible: false,
        };
        this.editBio = this.editBio.bind(this);
        this.saveBio = this.saveBio.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
        this.handleUploader = this.handleUploader.bind(this);
    }

    editBio() {
        console.log("editBio worked.");
        this.setState({
            textareaShowing: true,
        });
    }

    saveBio(e) {
        console.log("saveBio worked and the e.target is:", e.target);
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        fetch("/bio.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        })
            .then((result) => result.json())
            .then((data) => {
                console.log(
                    "========================================>data after posting to bio.json is :",
                    data
                );
                this.setState({
                    bio: data.bioText,
                    textareaShowing: false,
                });
            })
            .then(() => {
                console.log(
                    ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>this bioText now is:",
                    this.state.bio
                );
            });
    }

    closeUploader() {
        this.setState({
            uploaderIsVisible: false,
        });
    }
    handleUploader(e) {
        console.log("❤❤❤");
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        console.log("handleUploader is triggered");
        fetch("/upload.json", {
            method: "POST",
            body: formData,
        })
            .then((result) => result.json())
            .then((data) => {
                console.log(
                    "data after resolving the function handleUploader is:",
                    data
                );
                this.setState({
                    profilePicUrl: data.url,
                });
            })
            .catch((err) => {
                console.log("err in handleUploader is:", err);
            });
    }

    componentDidMount() {
        fetch("/profilepic")
            .then((resp) => resp.json())
            .then((result) => {
                // console.log(
                //     "------------------------------------>result in componentDidMount is:",
                //     result
                // );
                this.setState({
                    bio: result.bio,
                });
            });
    }

    render() {
        return (
            <div className="bioEditorDiv">
                <div className="bioEditorDivButton">
                    {this.state.bio && (
                        <button className="btn-two" onClick={this.editBio}>
                            Edit your Bio
                        </button>
                    )}
                    {!this.state.bio && (
                        <button className="btn-two" onClick={this.editBio}>
                            Add your Bio
                        </button>
                    )}
                    {this.state.textareaShowing && (
                        <>
                            <form
                                className="textareaFromEditor"
                                onSubmit={(e) => {
                                    this.saveBio(e);
                                }}
                            >
                                <textarea name="bioText"></textarea>
                                <button
                                    className="buttonFromEditor"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </form>
                        </>
                    )}
                    <Link to="/profile/uploader">
                        <button className="btn-two">Change the photos</button>
                    </Link>

                    <Link to="/album">
                        <button className="btn-two">Go to your Album</button>
                    </Link>
                    <Link to="/users">
                        <button className="btn-two">Find People</button>
                    </Link>
                    <Link to="/hobby">
                        <button className="btn-two">Choose your Hobby</button>
                    </Link>
                    <Link to="/">
                        <button className="btn-two">X</button>
                    </Link>
                </div>
                <Route path="/profile/uploader">
                    <Uploader
                        closeUploader={this.closeUploader}
                        handleUploader={this.handleUploader}
                    />
                </Route>
                <div className="bioText">
                    My Bio: <br></br>
                    {this.state.bio}
                </div>
            </div>
        );
    }
}
