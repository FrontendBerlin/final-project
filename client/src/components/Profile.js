import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";
import { Component } from "react";
// import { Link } from "react-router-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: props.uploaderIsVisible,
            bio: props.bio,
            setBio: props.setBio,
        };
    }
    render() {
        return (
            <div className="profileDiv">
                <ProfilePic
                    first={this.props.first}
                    last={this.props.last}
                    profilePicUrl={this.props.profilePicUrl}
                    uploaderIsVisible={this.props.uploaderIsVisible}
                    isPopupOpen={this.props.isPopupOpen}
                    turnToUploader={this.props.turnToUploader}
                />

                <BrowserRouter>
                    <Switch>
                        <Route path="/profile">
                            <BioEditor
                                bio={this.props.bio}
                                setBio={this.props.setBio}
                            />
                        </Route>
                        <Route path="">
                            <Hobbies />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
