import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Friendbutton from "./Friendbutton";

export default function MyFriends() {
    const [myFriends, setMyFriends] = useState([]);
    const [myFriendsInfo, setMyFriendsInfo] = useState([]);

    useEffect(() => {
        (async () => {
            console.log("Component MyFriends is running");

            fetch(`/myFriends.json`)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(
                        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data from api: ",
                        data.myFriends
                    );

                    setMyFriends(data.myFriends);
                    fetch(`/myFriendsInfo.json`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data.myFriends),
                    })
                        .then((resp) => resp.json())
                        .then((data) => {
                            console.log(
                                "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data from api: ",
                                data
                            );

                            setMyFriendsInfo(data.myFriendsInfo);
                        });
                });
        })();
        console.log(
            "❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣myFriendsInfo after useEffect:",
            myFriendsInfo
        );
    }, [myFriends]);
    return (
        <ul>
            <hr className="hr1" />
            {myFriendsInfo.map((item, idx) => (
                <li key={idx}>
                    {
                        <img
                            className="findPeopleImg"
                            src={
                                item.imageurl ||
                                "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixlib=rb-1.2.1&dl=amy-shamblen-pJ_DCj9KswI-unsplash.jpg&w=1920&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
                            }
                        />
                    }
                    {
                        <p className="findPeopleLiP">
                            <p className="findPeopleLiPP">
                                <Link to={"/user/" + item.id}>
                                    {item.first}
                                    {item.last}
                                </Link>
                            </p>
                            <div className="divForFriendbutton">
                                <Friendbutton userId={item.id} />
                            </div>
                        </p>
                    }
                    <hr className="hr1" />
                </li>
            ))}
        </ul>
    );
}
