import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Friendbutton from "./Friendbutton";

export default function OtherProfile() {
    const [users, setUsers] = useState([]);
    const { userId } = useParams();
    useEffect(() => {
        console.log("useEffect is running");

        // fetch(`https://spicedworld.herokuapp.com/?q=${country}`)
        fetch(`/api/user/${userId}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(
                    "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data from api: ",
                    data
                );
                setUsers(data);
            });
    }, []);

    return (
        <div className="otherPeopleDiv">
            <img
                className="OtherProfileImg"
                src={
                    users.imageUrl ||
                    "https://images.unsplash.com/photo-1511358146320-eb018ab3e22e?ixlib=rb-1.2.1&dl=sergey-pesterev-P0nWpyphwks-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
                }
                alt="hi"
            />
            <div className="otherPeopleDivName">
                {users.first}
                _from_
                {users.last}
            </div>
            <div className="otherPeopleDivDiv">{users.bio || "no bio yet"}</div>
            <Friendbutton userId={userId} />
            <button>
                {" "}
                <Link to="/users">Back to the selected Dish</Link>{" "}
            </button>
        </div>
    );
}

// <ul>
//                 {savedUsers.map((item, idx) => (
//                     <li key={idx}>
//                         {<img className="findPeopleImg" src={item.imageurl} />}
//                         {
//                             <p>
//                                 <Link to={"/user/" + item.id}>
//                                     {item.first} {item.last}
//                                 </Link>
//                             </p>
//                         }
//                     </li>
//                 ))}
//             </ul>
