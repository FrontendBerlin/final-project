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
                    id="box"
                    onClick={this.props.turnToUploader}
                    src={
                        this.props.profilePicUrl ||
                        "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixlib=rb-1.2.1&dl=amy-shamblen-pJ_DCj9KswI-unsplash.jpg&w=1920&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
                    }
                    alt={this.props.first + " " + this.props.last}
                />
            </>
        );
    }
}
