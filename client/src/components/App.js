import { Component } from "react";
import LoggedIn from "./LoggedIn";
import ProfilePic from "./ProfilePic";
import Profile from "./Profile.js";
// import Uploader from "./Uploader.js";
import { BrowserRouter, Route } from "react-router-dom";
import FindPeople from "./FindPeople";
import { Link } from "react-router-dom";
import OtherProfile from "./OtherProfile";
import Hobby from "./Hobby";
import Album from "./Album";
import FriendsAlbum from "./FriendsAlbum";
import MyFriends from "./MyFriends";
import MyRequest from "./MyRequest";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            first: "",
            last: "",
            profilePicUrl: "",
            uploaderIsVisible: false,
            bio: "",
            setBio: false,
        };

        this.turnToUploader = this.turnToUploader.bind(this);

        // this.handelUploader = this.handelUploader.bind(this);
    }

    turnToUploader() {
        console.log(">>>>>>>>>>>>>>>>>>>>>>");
        this.setState({
            uploaderIsVisible: true,
        });
    }
    // closeUploader() {
    //     this.setState({
    //         uploaderIsVisible: false,
    //     });
    // }
    // handleUploader(e) {
    //     e.preventDefault();
    //     const form = e.target;

    //     const formData = new FormData(form);
    //     console.log(
    //         ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>e.target from handleUploader is:",
    //         formData
    //     );
    //     console.log("handleUploader is triggered");
    //     fetch("/upload.json", {
    //         method: "POST",
    //         body: formData,
    //     })
    //         .then((result) => result.json())
    //         .then((data) => {
    //             console.log(
    //                 "data after resolving the function handleUploader is:",
    //                 data
    //             );
    //             this.setState({
    //                 profilePicUrl: data.url,
    //             });
    //         });
    // }

    componentDidMount() {
        console.log("Component Mounted");
        fetch("/profilepic")
            .then((resp) => resp.json())
            .then((result) => {
                // console.log(
                //     "------------------------------------>result in componentDidMount is:",
                //     result
                // );
                this.setState({
                    first: result.first,
                    last: result.last,
                    id: result.userId,
                    profilePicUrl: result.imageUrl,
                });
                // console.log(
                //     ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>the state after component mounted is",
                //     this.state.first,
                //     this.state.last,
                //     this.state.profilePicUrl
                // );
            });
    }

    render() {
        return (
            <div>
                <LoggedIn />

                <BrowserRouter>
                    <div className="appDiv">
                        <Route path="/">
                            <div className="appDivForTransform">
                                <Link to="/profile">
                                    <p id="pLinkToProfile">nothing</p>
                                </Link>
                                <ProfilePic
                                    first={this.state.first}
                                    last={this.state.last}
                                    profilePicUrl={this.state.profilePicUrl}
                                    uploaderIsVisible={
                                        this.state.uploaderIsVisible
                                    }
                                    isPopupOpen={this.state.isPopupOpen}
                                    turnToUploader={this.turnToUploader}
                                />
                            </div>
                            <div className="appDivForButton">
                                <Link to="/myFriends">
                                    <button id="btn3">My Friends</button>
                                </Link>
                                <Link to="/myRequest">
                                    <button id="btn4">My Request</button>
                                </Link>
                            </div>
                        </Route>

                        <Route path="/profile">
                            <div className="appProfileDiv">
                                <Profile
                                    // id={this.state.id}
                                    first={this.state.first}
                                    last={this.state.last}
                                    profilePicUrl={this.state.profilePicUrl}
                                    uploaderIsVisible={
                                        this.state.uploaderIsVisible
                                    }
                                    turnToUploader={this.turnToUploader}
                                    bio={this.state.bio}
                                    setBio={this.setBio}
                                />
                            </div>
                        </Route>
                        {/* <Route exact path="/profile/uploader">
                            {this.state.uploaderIsVisible && (
                            <Uploader
                                closeUploader={this.closeUploader}
                                handleUploader={this.handleUploader}
                            />
                             )} 
                        </Route> */}
                        <Route path="/users">
                            <FindPeople />
                        </Route>
                        <Route path="/user/:userId">
                            <OtherProfile />
                        </Route>
                        <Route path="/hobby">
                            <Hobby />
                        </Route>
                        <Route path="/album">
                            <Album />
                        </Route>
                        <Route path="/friendsAlbum/:userId">
                            <FriendsAlbum />
                        </Route>
                        <Route path="/myFriends">
                            <MyFriends />
                        </Route>
                        <Route path="/myRequest">
                            <MyRequest />
                        </Route>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
