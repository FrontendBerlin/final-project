import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindPeople() {
    // first - name of property in state
    // setFirst - function that we can call which changes the value of 'first' in state
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [savedUsers, setSavedUsers] = useState([]);

    // you can also use multiple useEffects in your component!
    useEffect(() => {
        console.log("useEffect is running");

        // fetch(`https://spicedworld.herokuapp.com/?q=${country}`)
        fetch(`/findPeople.json`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(
                    "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data from api: ",
                    data
                );
                // data.response.map((item) => {
                //     setFirst(item.first);
                // });
            });

        // cleanup function - this runs BEFORE every re-render of our component
        // acts as componentWillUnmount
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

    return (
        <div className="findPeopleDiv">
            <input
                // onChange={handleInput}
                onChange={(e) => setSearch(e.target.value)}
                defaultValue={users}
                placeholder="Which State does the Dish represent"
            />
            <button>
                {" "}
                <Link to="/profile">Back to the selected Dish</Link>{" "}
            </button>

            <ul>
                {savedUsers.map((item, idx) => (
                    <li key={idx}>
                        {
                            <img
                                className="findPeopleImg"
                                src={
                                    item.imageurl ||
                                    "https://images.unsplash.com/photo-1446853663655-381f4a1ce3fd?ixlib=rb-1.2.1&dl=scott-webb-agn2nRboqLI-unsplash.jpg&w=1920&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
                                }
                            />
                        }
                        {
                            <p className="findPeopleLiP">
                                <Link to={"/user/" + item.id}>
                                    {item.first} {item.last}
                                </Link>
                            </p>
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
}
