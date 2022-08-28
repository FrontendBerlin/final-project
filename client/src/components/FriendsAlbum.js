import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Like from "./Like";

export default function FriendsAlbum() {
    const { userId } = useParams();
    const [image, setImage] = useState([]);
    const [friend, setFriend] = useState([]);

    const handleLike = (e) => {
        console.log(
            ")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))",
            e.target
        );
    };

    useEffect(() => {
        (async () => {
            console.log("useEffect is running");

            fetch(`/albumEffect/${userId}`)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(
                        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data from albumEffect: ",
                        data
                    );
                    setImage(data.url);
                });
        })();
    }, []);
    useEffect(() => {
        (async () => {
            fetch(`/api/user/${userId}`)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(
                        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data from api/user: ",
                        data
                    );
                    setFriend(data);
                });
        })();
    }, []);
    return (
        <>
            <div>
                <div className="friendsAlbumHeader">
                    <div>
                        Welcom to Album of{" "}
                        <Link to="/myFriends">{friend.first}</Link>{" "}
                    </div>
                    {/* <img
                        src={
                            friend.imageUrl ||
                            "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixlib=rb-1.2.1&dl=amy-shamblen-pJ_DCj9KswI-unsplash.jpg&w=1920&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
                        }
                    /> */}
                </div>

                <br></br>
                <hr></hr>
                <div>
                    <ul className="albumUl">
                        {image.map((item, idx) => (
                            <li key={idx}>
                                <Like
                                    url={item.url}
                                    userId={item.userid}
                                    handleLike={handleLike}
                                    description={item.description}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
