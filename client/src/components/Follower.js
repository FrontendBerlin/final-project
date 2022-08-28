import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

export default function Follower(props) {
    const [followers, setFollowers] = useState([]);
    const [popup, setPopup] = useState(false);

    const checkFollowers = (id) => {
        const idOfFollowers = { id: id };
        setPopup(!popup);
        fetch("/checkFollowers.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(idOfFollowers),
        })
            .then((result) => result.json())
            .then((data) => {
                console.log("data after resolving checkFollowers is:", data);
                setFollowers(data.likedpeople);
                console.log(")))))))))))))))))))))followers:", followers);
            });
    };
    return (
        <div>
            {popup == true && (
                <p className="followers">
                    {followers.map((item, idx) => {
                        return (
                            <li key={idx}>💘{item.first + "" + item.last}💘</li>
                        );
                    })}
                </p>
            )}
            {popup == false && (
                <p className="followersNone">
                    {followers.map((item, idx) => {
                        return (
                            <li key={idx}>💘{item.first + "" + item.last}💘</li>
                        );
                    })}
                </p>
            )}

            <button
                className="deletePicAlbum"
                onClick={() => checkFollowers(props.id)}
            >
                Followers
            </button>
        </div>
    );
}
