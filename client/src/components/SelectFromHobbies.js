import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SelectFromHobbies({ onUsersFilter }) {
    const [search, setSearch] = useState([]);
    const [popup, setPopup] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [selectedHobby, setSelectedHobby] = useState([]);

    // var selectedHobby = [];
    const selectedPeopleId = selectedPeople.map((people) => people.id);
    console.log("👩👨🧑👧👦🧒👶", selectedPeopleId);

    const selectPeople = (e) => {
        e.preventDefault();
        // setSearch([...search, e.target.name]);
        // console.log("+++++++++++++++++++++++++search:", search);

        if (selectedHobby.indexOf(e.target.name) == -1) {
            setSelectedHobby((current) => [...current, e.target.name]);
        }

        console.log(
            "----------------------------selectedHobby:",
            selectedHobby.join(",")
        );

        // if (selectedPeople == false) {
        fetch(`/selectPeople.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                search: e.target.name,
                selectedPeopleId,
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(
                    "---------------------------->data after fetching selectPeople.json",
                    data
                );
                setSelectedPeople(data.response);
                onUsersFilter(data.response);
            });

        document.querySelector(`button[name=${e.target.name}]`).className =
            "clicked";
        setPopup([...popup, e.target.name]);
        console.log("✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔", popup);
        // }
    };

    // fetch("/register.json", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(userData),
    // })
    //     .then((resp) => resp.json())

    return (
        <>
            <ul id="selectFromHobbiesUl">
                <li>
                    {popup.indexOf("coding") == -1 && (
                        <button name="coding" onClick={(e) => selectPeople(e)}>
                            Code
                        </button>
                    )}
                    {popup.indexOf("coding") !== -1 && (
                        <button name="coding" className="clicked">
                            👩‍💻
                        </button>
                    )}
                </li>
                <li>
                    {popup.indexOf("sport") == -1 && (
                        <button name="sport" onClick={(e) => selectPeople(e)}>
                            Sport
                        </button>
                    )}
                    {popup.indexOf("sport") !== -1 && (
                        <button name="sport" className="clicked">
                            🏃‍♂️
                        </button>
                    )}
                </li>
                <li>
                    {popup.indexOf("movie") == -1 && (
                        <button name="movie" onClick={(e) => selectPeople(e)}>
                            Movie
                        </button>
                    )}
                    {popup.indexOf("movie") !== -1 && (
                        <button name="movie" className="clicked">
                            📺
                        </button>
                    )}
                </li>
                <li>
                    {popup.indexOf("cooking") == -1 && (
                        <button name="cooking" onClick={(e) => selectPeople(e)}>
                            Cook
                        </button>
                    )}
                    {popup.indexOf("cooking") !== -1 && (
                        <button name="cooking" className="clicked">
                            🍕
                        </button>
                    )}
                </li>
                <li>
                    {popup.indexOf("music") == -1 && (
                        <button name="music" onClick={(e) => selectPeople(e)}>
                            Music
                        </button>
                    )}
                    {popup.indexOf("music") !== -1 && (
                        <button name="music" className="clicked">
                            🎶
                        </button>
                    )}
                </li>
            </ul>
        </>
    );
}
