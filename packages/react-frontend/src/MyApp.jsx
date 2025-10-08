// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

const characters = [
    {
        name: "Charlie",
        job: "Janitor"
    },
    {
        name: "Mac",
        job: "Bouncer"
    },
    {
        name: "Dee",
        job: "Aspiring Actress"
    },
    {
        name: "Dennis",
        job: "Bartneder"
    }
];

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
        // const updated = characters.filter((character, i) => {
        // return i !== index;
        // });
        // setCharacters(updated);

        const promise = fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE"
        })
        .then(res => {
            if (res.status === 204) {
                setCharacters(characters.filter(character => character.id !== id));
            } else if (res.status == 404) {
                console.log("Resource not found");
            } else {
                console.log("User not deleted. Satus code:", res.status);
            }
        })
        .catch((error) => {
            console.log(error);
            });

        return promise;
    }

    function updateList(person) {
        postUser(person)
        .then((res) => {
            if (res.status === 201) {
                return res.json().then((updatedPerson) => {
                    setCharacters([...characters, updatedPerson]);
                })
            } else {
                console.log("User not added. Status code:", res.status);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

    

    useEffect(() => {
        fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );

    return (
    <div className="container">
        <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
    </div>
    );
}

function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}

export default MyApp;