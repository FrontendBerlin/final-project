import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useParams } from "react-router";

export default function Friendbutton(props) {
    const [friendship, setFriendship] = useState({});
    const { userId } = props;
    useEffect(() => {
        (async () => {
            console.log("userId is -------->", userId);

            // fetch(`https://spicedworld.herokuapp.com/?q=${country}`)
            fetch(`/friendship.json/${userId}`)
                .catch((err) => {
                    console.log(
                        "<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>err is:",
                        err
                    );
                })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(
                        ".....................................friendship is posted and the data hier is:",
                        data
                    );
                    setFriendship(data);
                });
        })();
    }, []);

    const requestFriendship = (e) => {
        console.log("requestFriendship worked and the e.target is:", e.target);
        e.preventDefault();

        fetch(`/requestFriendship.json/${userId}`, {
            method: "POST",
        })
            .then((result) => result.json())
            .then((data) => {
                console.log(
                    "requestrequestrequestrequestrequestrequest data:",
                    data
                );
                setFriendship(data);
            });
    };

    const cancelFriendship = (e) => {
        console.log("😢😢😢😢😢", friendship);
        e.preventDefault();
        fetch(`/cancelFriendship.json/${userId}`, {
            method: "POST",
        })
            .then((result) => result.json())
            .then((data) => {
                console.log("cancelcancelcancelcancelcancelcancel data:", data);
                setFriendship(data);
            });
    };

    const acceptFriendship = (e) => {
        console.log("😍😍", friendship);
        e.preventDefault();
        fetch(`/acceptFriendship.json/${userId}`, {
            method: "POST",
        })
            .then((result) => result.json())
            .then((data) => {
                console.log("acceptacceptacceptacceptacceptaccept data:", data);
                setFriendship(data);
            });
    };

    // if (friendship.id) {
    //     if (friendship.accepted) {
    //         return (
    // <button
    //     onClick={(e) => {
    //         cancelFriendship(e);
    //     }}
    // >
    //     cancel a friendship
    // </button>
    //         );
    //     } else {
    //         return (
    //             <button
    //                 onClick={(e) => {
    //                     cancelFriendship(e);
    //                 }}
    //             >
    //                 cancel the request
    //             </button>
    //         );
    //     }
    // } else {
    //     return (
    // <button
    //     onClick={(e) => {
    //         requestFriendship(e);
    //     }}
    // >
    //     request for a friendship
    // </button>
    //     );
    // }
    return (
        <div id="friendButtonDiv">
            {friendship.accepted && (
                <button
                    onClick={(e) => {
                        cancelFriendship(e);
                    }}
                >
                    cancel the friendship
                </button>
            )}
            {friendship.accepted && (
                <Link to={"/friendsAlbum/" + userId}>
                    <button> Visit the Album of this Friend.</button>
                </Link>
            )}

            {/* <Link to={"/friendsAlbum/" + userId}>
                <button>Visiit the Album of this Friend</button>
            </Link> */}
            {friendship.id &&
                !friendship.accepted &&
                friendship.recipient_id == userId && (
                    <button
                        onClick={(e) => {
                            cancelFriendship(e);
                        }}
                    >
                        cancel the request
                    </button>
                )}
            {friendship.id &&
                !friendship.accepted &&
                friendship.sender_id == userId && (
                    <button
                        onClick={(e) => {
                            acceptFriendship(e);
                        }}
                    >
                        accept the request
                    </button>
                )}
            {!friendship.id && (
                <button
                    onClick={(e) => {
                        requestFriendship(e);
                    }}
                >
                    request for friendship
                </button>
            )}
        </div>
    );
}
