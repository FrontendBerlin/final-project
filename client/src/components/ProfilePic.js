import { Component } from "react";

// import Profile from "./Profile.js";

export default class ProfilePic extends Component {
    constructor(props) {
        super(props);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", props);
    }

    componentDidMount() {}

    render() {
        return (
            <>
                <img
                    onClick={this.props.turnToUploader}
                    src={
                        this.props.profilePicUrl ||
                        "https://images.unsplash.com/photo-1587361144243-03f7925381ca?ixlib=rb-1.2.1&dl=emil-huang-j-iRFjHCs5o-unsplash.jpg&w=1920&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
                    }
                    alt={this.props.first + " " + this.props.last}
                />
            </>
        );
    }
}
