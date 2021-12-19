import React from "react";

const PokeDex2 = (props) => {
  return (
    <>
      <span>{props.pokemon.name}</span>
      <img src={props.pokemon.img}></img>
    </>
  );
};

export default PokeDex2;
