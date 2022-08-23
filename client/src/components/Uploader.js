import { Component } from "react";
import { Link } from "react-router-dom";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // uploaderIsVisible: props.uploaderIsVisible,
        };
        // this.closeUploader = this.closeUploader.bind(this);
    }

    render() {
        return (
            <div className="uploaderDiv">
                <Link to="/profile">
                    <div
                        className="uploaderX"
                        onClick={this.props.closeUploader}
                    >
                        x
                    </div>
                </Link>
                <div className="uploaderDivP">Want to change the Profile??</div>
                <form
                    onSubmit={(e) => {
                        this.props.handleUploader(e);
                    }}
                >
                    <input type="file" name="photo" />
                    <button style={{ width: 80 + "px" }} name="submit">
                        {" "}
                        Upload{" "}
                    </button>
                </form>
            </div>
        );
    }
}
