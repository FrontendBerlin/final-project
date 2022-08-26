import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

export default function Album() {
    const [image, setImage] = useState([]);
    // const [insert, setInsert] = useState([]);

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
                console.log(
                    "................................image after fetching /album.json:",
                    image
                );
                setImage([...image, data.url]);

                // console.log("🔯🔯🔯☯☯☯☯☯☯image:", image);
            });
    };
    useEffect(() => {
        (async () => {
            console.log("useEffect is running");

            fetch("/albumEffect.json")
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(
                        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<data from api: ",
                        data.url
                    );
                    setImage(data.url);
                });
        })();
        console.log("❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣❣image after useEffect:", image);
    }, []);
    return (
        <>
            <div>
                <div>You can upload your Pictures here.</div>
                <form
                    onSubmit={(e) => {
                        handleUploader(e);
                    }}
                >
                    <input type="file" name="photo" />
                    <button style={{ width: 80 + "px" }} name="submit">
                        {" "}
                        Upload{" "}
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
