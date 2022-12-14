import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Friendbutton from "./Friendbutton";

export default function MyRequest() {
    const [myRequest, setMyRequest] = useState([]);
    const [myRequestInfo, setMyRequestInfo] = useState([]);

    useEffect(() => {
        (async () => {
            console.log("Component MyRequest is running");

            fetch(`/myRequest.json`)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(
                        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data from api: ",
                        data.myRequest
                    );

                    setMyRequest(data.myRequest);
                    fetch(`/myRequestInfo.json`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data.myRequest),
                    })
                        .then((resp) => resp.json())
                        .then((data) => {
                            console.log(
                                "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data from api: ",
                                data
                            );

                            setMyRequestInfo(data.myRequestInfo);
                        });
                });
        })();
        console.log(
            "❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣myFriendsInfo after useEffect:",
            myRequestInfo
        );
    }, [myRequest]);
    return (
        <ul>
            <hr className="hr2" />
            {myRequestInfo.map((item, idx) => (
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
                            <Link to={"/user/" + item.id}>
                                {item.first}
                                {item.last}
                            </Link>
                            <div
                                className="divForFriendbutton"
                                id="configuration"
                            >
                                <Friendbutton userId={item.id} />
                            </div>
                        </p>
                    }
                    <hr className="hr2" />
                </li>
            ))}
        </ul>
    );
}
