import React, { useState, useEffect } from "react";
import { Character } from "./Character";
import md5 from "crypto-js/md5";
import env from "react-dotenv";

export default function CharacterList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("characters") === null) {
        setList(["No internet connection detected :'("]);
      } else setList(JSON.parse(localStorage.getItem("characters")));
    } else {
      const ts = new Date().getTime().toString();
      const hash = md5(ts + env.PRIVATE_MARVEL_KEY + env.PUBLIC_MARVEL_KEY);

      let url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${env.PUBLIC_MARVEL_KEY}&hash=${hash}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          let characters = data.data.results;
          setList(characters);
          localStorage.setItem("characters", JSON.stringify(characters));
          console.log("Response", data);
        });
    }
  }, []);

  return (
    <>
      <h1>Marvel's characters</h1>
      {list.length > 1 ? (
        list.map((e, i) => (
          <Character
            key={i}
            name={e.name}
            description={
              e.description === "" ? "No description available" : e.description
            }
            thumbnail={e.thumbnail}
          />
        ))
      ) : list.length === 0 ? (
        <h4>Loading...</h4>
      ) : (
        <h4>{list[0]}</h4>
      )}
    </>
  );
}
