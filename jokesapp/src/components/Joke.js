import React, { useState, useEffect } from "react";

export default function Joke() {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    if (!navigator.onLine) {
      console.log("offline");
      if (localStorage.getItem("joke") === null) setJoke("Loading...");
      else setJoke(localStorage.getItem("joke"));
    }

    fetch("https://api.chucknorris.io/jokes/random")
      .then((res) => res.json())
      .then((res) => {
        setJoke(res.value);
        localStorage.setItem("joke", res.value);
        console.log("Response", res);
      });
  }, []);

  return <h1>{joke}</h1>;
}
