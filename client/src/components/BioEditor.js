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
                <p>
                    {this.state.bio && (
                        <button onClick={this.editBio}>Edit your Bio</button>
                    )}
                    {!this.state.bio && (
                        <button onClick={this.editBio}>Add your Bio</button>
                    )}
                </p>
                {this.state.textareaShowing && (
                    <>
                        <form
                            onSubmit={(e) => {
                                this.saveBio(e);
                            }}
                        >
                            <textarea name="bioText"></textarea>
                            <button type="submit">Save</button>
                        </form>
                    </>
                )}
                <Link to="/profile/uploader">
                    <button>Change the photos</button>
                </Link>
                <Route path="/profile/uploader">
                    <Uploader
                        closeUploader={this.closeUploader}
                        handleUploader={this.handleUploader}
                    />
                </Route>
                <Link to="/album">
                    <button>Go to your Album</button>
                </Link>
                <Link to="/">
                    <button>Finished Description</button>
                </Link>
                <button>
                    {" "}
                    <Link to="/users">Find Friends</Link>{" "}
                </button>
                <Link to="/hobby">
                    <button>Choose your Hobby</button>
                </Link>
                <div className="bioText">{this.state.bio}</div>
            </div>
        );
    }
}
