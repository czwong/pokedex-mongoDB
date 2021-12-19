import React from 'react';

const PokeDex = (props) => {
  return (
    <div className="pokedex">
      {props.pokedex.map((pokemon, index) => {
        return (
          <div className="pokemon" key={index}>
            {pokemon.display ?
              <form>
                <input
                  placeholder={'Change Poke Name'}
                  onChange={e => props.onChange(e, 'input')}>
                </input>
                <button onClick={e => props.changeName(e, index)}>Confirm</button>
                <button onClick={e => props.delete(e, index)}>Delete</button>
              </form>
            : null}
            <a href='#' onClick={e => props.changeDisplay(e, index)}>{pokemon.name}</a>
            <img src={pokemon.img}></img>
          </div>
        )
      })}
    </div>
  )
}

export default PokeDex;