import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hobby() {
    const [hobby, setHobby] = useState({});
    const [checkifsaved, setCheckIfSaved] = useState(false);
    // const HobbyButton = [
    //     ...document.querySelectorAll("input[type=checkbox]"),
    // ].map((element) => element.value);

    // console.log("☯", HobbyButton);
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(
            ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>hobby❤:",
            hobby
        );
        let { entries } = Object;
        let likedHobby = [];

        for (let [key, value] of entries(hobby)) {
            // console.log("----------------->", [key, value]);
            if (value == true) {
                likedHobby.push(key);
            }
        }
        console.log("💛💛💚💚💙💚❤❤likedHobby:", likedHobby);

        fetch(`/hobby.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ hobbies: likedHobby }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(
                    "🔯🔯🔯🔯🔯🔯🔯response after fetch ./hobbby.json",
                    data
                );
                // fetch(`/hobby2.json`, {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify(data),
                // });
            });
        setCheckIfSaved(true);
    };
    const handleChange = (e) => {
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<", e.target.value);
        setHobby({ ...hobby, [e.target.value]: e.target.checked });
    };
    useEffect(() => {
        setCheckIfSaved(false);
    }, []);
    return (
        <>
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <fieldset className="hobbyFieldset">
                    <legend>Choose your interests</legend>
                    <div>
                        <input
                            type="checkbox"
                            id="coding"
                            name="interest"
                            value="coding"
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor="coding">Coding</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="sport"
                            name="interest"
                            value="sport"
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor="sport">Sport</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="movie"
                            name="interest"
                            value="movie"
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor="movie">Movie</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="cooking"
                            name="interest"
                            value="cooking"
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor="cooking">Cooking</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="music"
                            name="interest"
                            value="music"
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor="music">Music</label>
                    </div>
                </fieldset>
                {checkifsaved == false && (
                    <button className="savehobby" type="submit">
                        ✔
                    </button>
                )}
                {checkifsaved == true && (
                    <Link to="/profile">
                        <button className="savehobby1" type="submit">
                            Back↩
                        </button>
                    </Link>
                )}
            </form>
        </>
    );
}
