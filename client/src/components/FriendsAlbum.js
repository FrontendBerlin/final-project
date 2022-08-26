import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export default function FriendsAlbum() {
    const { userId } = useParams();
    const [image, setImage] = useState([]);
    const [friend, setFriend] = useState([]);

    useEffect(() => {
        (async () => {
            console.log("useEffect is running");

            fetch(`/albumEffect/${userId}`)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(
                        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data from api: ",
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
                        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data from api: ",
                        data
                    );
                    setFriend(data);
                });
        })();
    }, []);
    return (
        <>
            <div>
                <div>Welcom to Album of {friend.first}</div>
                <img src={friend.url} />

                <br></br>
                <hr></hr>
                <div>
                    <ul className="albumUl">
                        {image.map((item, idx) => (
                            <li key={idx}>
                                {
                                    <img
                                        className="findPeopleImg"
                                        src={
                                            item.url ||
                                            "https://images.unsplash.com/photo-1511358146320-eb018ab3e22e?ixlib=rb-1.2.1&dl=sergey-pesterev-P0nWpyphwks-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
                                        }
                                    />
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

// const [users, setUsers] = useState([]);
// useEffect(() => {
//     fetch(`/api/user/${userId}`)
//         .then((resp) => resp.json())
//         .then((data) => {
//             console.log(
//                 "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data from api: ",
//                 data.userId
//             );
//             setUsers(data.userId);
//         });
// }, []);

// return (
//     <div className="otherPeopleDiv">
//         <img
//             className="OtherProfileImg"
//             src={
//                 users.imageUrl ||
//                 "https://images.unsplash.com/photo-1511358146320-eb018ab3e22e?ixlib=rb-1.2.1&dl=sergey-pesterev-P0nWpyphwks-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
//             }
//             alt="hi"
//         />
//         <div className="otherPeopleDivName">
//             {users.first}
//             _from_
//             {users.last}
//         </div>
//         <div className="otherPeopleDivDiv">{users.bio || "no bio yet"}</div>
//         <Friendbutton userId={userId} />
//         <button>
//             {" "}
//             <Link to="/users">Back to the selected Dish</Link>{" "}
//         </button>
//     </div>
// );
