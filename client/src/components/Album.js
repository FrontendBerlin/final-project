import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Follower from "./Follower";

export default function Album() {
    const [image, setImage] = useState([]);
    const [deleteSituation, setDeleteSituation] = useState(false);
    // const [followers, setFollowers] = useState([]);

    const handleUploader = (e) => {
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        console.log(
            ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>e.target from handleUploader is:",
            formData
        );

        fetch("/album.json", {
            method: "POST",
            body: formData,
        })
            .then((result) => result.json())
            .then((data) => {
                console.log(
                    "data after resolving the function handleUploader is:",
                    data
                );

                setImage([...image, data.result]);

                // console.log("🔯🔯🔯☯☯☯☯☯☯image:", image);
            });
    };
    const handleDelete = (id) => {
        console.log("..................id from hanleDelete is:", id);
        const idToDelete = {
            id: id,
        };
        fetch("/deletePic.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(idToDelete),
        });
        setDeleteSituation(!deleteSituation);
    };
    // const checkFollowers = (id) => {
    //     const idOfFollowers = { id: id };
    //     fetch("/checkFollowers.json", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(idOfFollowers),
    //     })
    //         .then((result) => result.json())
    //         .then((data) => {
    //             console.log("data after resolving checkFollowers is:", data);
    //             setFollowers(data.likedpeople);
    //             console.log(")))))))))))))))))))))followers:", followers);
    //         });
    // };
    useEffect(() => {
        (async () => {
            fetch("/albumEffect.json")
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(
                        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data from api: ",
                        data
                    );
                    setImage(data.url);
                });
        })();
        console.log("❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣image after useEffect:", image);
    }, [deleteSituation]);
    return (
        <>
            <div>
                <form
                    className="albumForm"
                    onSubmit={(e) => {
                        handleUploader(e);
                    }}
                >
                    <div>You can upload your Pictures here.</div>
                    <textarea
                        type="text"
                        name="Description"
                        placeholder="Description"
                        className="descriptionInput"
                    />

                    <input type="file" name="photo" />
                    <button style={{ width: 80 + "px" }} name="submit">
                        {" "}
                        Submit{" "}
                    </button>
                </form>
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
                                            "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixlib=rb-1.2.1&dl=amy-shamblen-pJ_DCj9KswI-unsplash.jpg&w=1920&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
                                        }
                                    />
                                }
                                <p className="descriptionInPicAlbum">
                                    {item.description}
                                </p>
                                {/* <p>
                                    {followers.map((item, idx) => {
                                        return (
                                            <li key={idx}>
                                                {item.first + "" + item.last}
                                            </li>
                                        );
                                    })}
                                </p> */}
                                <Follower
                                    // followers={followers}
                                    // checkFollowers={checkFollowers}
                                    id={item.id}
                                />

                                <button
                                    className="deletePicAlbum"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
