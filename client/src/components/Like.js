import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useParams } from "react-router";

export default function Like(props) {
    const [likeState, setLikeState] = useState(false);

    const likeClick = () => {
        setLikeState(!likeState);
    };

    const handleLike = (e) => {
        console.log(
            "((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((",
            e.target
        );
        const url = props.url;
        const userId = props.userId;
        fetch("/likePic.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url, userId }),
        });
    };
    const handleUnlike = (e) => {
        console.log(
            ")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))",
            e.target
        );
        const url = props.url;
        const userId = props.userId;
        fetch("/unlikePic.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url, userId }),
        });
    };

    return (
        <>
            <form>
                <img
                    className="findPeopleImg"
                    src={
                        props.url ||
                        "https://images.unsplash.com/photo-1511358146320-eb018ab3e22e?ixlib=rb-1.2.1&dl=sergey-pesterev-P0nWpyphwks-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
                    }
                />
                <p className="descriptionInPicAlbum">
                    <strong>Description:</strong>
                    <br />
                    {props.description}
                </p>
                {likeState == true && (
                    <button
                        className="likeSymbol"
                        type="submit"
                        onClick={(e) => {
                            likeClick(e);
                            handleUnlike(e);
                        }}
                    >
                        💗
                    </button>
                )}
                {likeState == false && (
                    <button
                        className="unlikeSymbol"
                        type="submit"
                        onClick={(e) => {
                            likeClick(e);
                            handleLike(e);
                        }}
                    >
                        🤍
                    </button>
                )}
            </form>
        </>
    );
}
