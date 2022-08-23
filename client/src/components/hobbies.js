import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import ProfilePic from "./ProfilePic";
import { Component } from "react";

export default class Hobbies extends Component {
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
            <>
                <div className="profileDiv">
                    <ProfilePic
                        first={this.props.first}
                        last={this.props.last}
                        profilePicUrl={this.props.profilePicUrl}
                        uploaderIsVisible={this.props.uploaderIsVisible}
                        isPopupOpen={this.props.isPopupOpen}
                        turnToUploader={this.props.turnToUploader}
                    />
                </div>
                <div className="hobbiesDiv">
                    <form>
                        <fieldset>
                            <legend>Choose your interests</legend>
                            <div>
                                <input
                                    type="checkbox"
                                    id="coding"
                                    name="interest"
                                    value="coding"
                                />
                                <label htmlFor="coding">Coding</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="music"
                                    name="interest"
                                    value="music"
                                />
                                <label htmlFor="music">Music</label>
                            </div>
                        </fieldset>
                    </form>
                </div>
                ;
            </>
        );
    }
}
