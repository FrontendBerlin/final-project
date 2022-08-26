import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SelectFromHobbies from "./SelectFromHobbies";

export default function FindPeople() {
    // first - name of property in state
    // setFirst - function that we can call which changes the value of 'first' in state
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [savedUsers, setSavedUsers] = useState([]);
    const [popupSelectFromHobbies, setPopupSelectFromHobbies] = useState(false);

    const onUsersFilter = (newUsers) => {
        console.log("new users", newUsers);
        setUsers(newUsers);
    };
    // you can also use multiple useEffects in your component!
    useEffect(() => {
        console.log("useEffect is running");

        fetch(`/findPeople.json`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(
                    "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data from api: ",
                    data
                );
            });
    }, []);

    useEffect(() => {
        fetch(`/findPeople.json/${search}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(
                    "-------------------------------------------->:",
                    data
                );
                setSavedUsers(data.response);
            })
            .then(
                console.log(
                    ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>savedUsers are:",
                    savedUsers
                )
            );
    }, [search]);

    // function handleInput(e) {
    //     // console.log("value in input field: ", e.target.value);
    //     setFirst(e.target.value);
    // }

    const popup = () => {
        if (popupSelectFromHobbies == false) {
            setPopupSelectFromHobbies(true);
        } else if (popupSelectFromHobbies == true) {
            setPopupSelectFromHobbies(false);
        }
    };

    return (
        <div className="findPeopleDiv">
            <input
                // onChange={handleInput}
                onChange={(e) => setSearch(e.target.value)}
                // defaultValue={users}
                placeholder="Which State does the Dish represent"
            />
            <button>
                {" "}
                <Link to="/profile">Back to the selected Dish</Link>{" "}
            </button>
            <button
                onClick={(e) => {
                    popup(e);
                }}
            >
                Select People from their Hobbies
            </button>
            {popupSelectFromHobbies && (
                <SelectFromHobbies onUsersFilter={onUsersFilter} />
            )}

            {!popupSelectFromHobbies && (
                <ul>
                    {savedUsers.map((item, idx) => (
                        <li key={idx}>
                            {
                                <img
                                    className="findPeopleImg"
                                    src={
                                        item.imageurl ||
                                        "https://images.unsplash.com/photo-1511358146320-eb018ab3e22e?ixlib=rb-1.2.1&dl=sergey-pesterev-P0nWpyphwks-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
                                    }
                                />
                            }
                            {
                                <p className="findPeopleLiP">
                                    <Link to={"/user/" + item.id}>
                                        {item.first}
                                        {item.last}
                                    </Link>
                                </p>
                            }
                        </li>
                    ))}
                </ul>
            )}

            {popupSelectFromHobbies && (
                <ul>
                    {users.map((item, idx) => (
                        <li key={idx}>
                            {
                                <img
                                    className="findPeopleImg"
                                    src={
                                        item.imageurl ||
                                        "https://images.unsplash.com/photo-1511358146320-eb018ab3e22e?ixlib=rb-1.2.1&dl=sergey-pesterev-P0nWpyphwks-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
                                    }
                                />
                            }
                            {
                                <p className="findPeopleLiP">
                                    <Link to={"/user/" + item.id}>
                                        {item.first}
                                        {item.last}
                                    </Link>
                                </p>
                            }
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
