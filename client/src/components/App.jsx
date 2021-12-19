import React from "react";
import axios from "axios";
import PokeDex from "./PokeDex";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pokedex: [],
      type: "",
      input: "",
      addPokemon: false,
      addPokemonName: "",
      addPokemonImage: "",
      addPokemonType: "",
    };

    this.getAll = this.getAll.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this.changeName = this.changeName.bind(this);
    this.onChange = this.onChange.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteFromBrowser = this.deleteFromBrowser.bind(this);
    this.clickAddPokemon = this.clickAddPokemon.bind(this);
    this.addPokeToDB = this.addPokeToDB.bind(this);
    this.addPokeToDOM = this.addPokeToDOM.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    axios
      .get("/pokemon")
      .then((res) => {
        this.setState({
          pokedex: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  getType() {
    axios
      .get(`/pokemon/type/${this.state.type}`)
      .then((res) => {
        this.setState({
          pokedex: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  deleteFromBrowser(ID) {
    this.state.pokedex = this.state.pokedex.filter((pokemon) => {
      return pokemon._id !== ID;
    });

    this.setState({
      pokedex: this.state.pokedex,
    });
  }

  delete(e, index) {
    e.preventDefault();
    const ID = this.state.pokedex[index]._id;
    axios
      .post(`/pokemon/id/${ID}`, { type: "delete" })
      .then(this.deleteFromBrowser(ID));
  }

  changeDisplay(e, index) {
    e.preventDefault();
    this.state.pokedex[index].display = !this.state.pokedex[index].display;
    this.setState({
      pokedex: this.state.pokedex,
    });
  }

  updateFromBrowser(index) {
    this.setState({
      pokedex: this.state.pokedex,
    });
  }

  changeName(e, index) {
    e.preventDefault();
    const ID = this.state.pokedex[index]._id;
    this.state.pokedex[index].name = this.state.input;
    axios
      .post(`/pokemon/id/${ID}`, {
        type: "update",
        data: this.state.pokedex[index],
      })
      .then(this.updateFromBrowser(index));
  }

  addPokeToDOM() {
    const poke = {
      name: this.state.addPokemonName,
      type: this.state.addPokemonType,
      img: this.state.addPokemonImage,
      display: false,
    };

    this.state.pokedex.push(poke);
    this.setState({
      pokedex: this.state.pokedex,
      addPokemonName: "",
      addPokemonType: "",
      addPokemonImage: "",
    });
  }

  addPokeToDB() {
    axios
      .post("/pokemon", {
        name: this.state.addPokemonName,
        type: this.state.addPokemonType,
        img: this.state.addPokemonImage,
        display: false,
      })
      .then(this.addPokeToDOM);
  }

  clickAddPokemon() {
    this.setState({
      addPokemon: true,
    });
  }

  onSelect(e) {
    this.setState(
      {
        type: e.target.value,
      },
      this.getType
    );
  }

  onChange(e, key) {
    this.setState({
      [`${key}`]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1>Pokemon!</h1>
        <button onClick={this.getAll}>Show All</button>
        <select id="cars" onChange={this.onSelect}>
          <option>Sort by Type</option>
          <option>Grass</option>
          <option>Fire</option>
          <option>Water</option>
          <option>Normal</option>
          <option>Poison</option>
          <option>Electric</option>
          <option>Ground</option>
          <option>Fighting</option>
          <option>Psychic</option>
          <option>Rock</option>
          <option>Ghost</option>
          <option>Dragon</option>
        </select>
        <button onClick={this.clickAddPokemon}>INSERT</button>
        {this.state.addPokemon ? (
          <form>
            <input
              placeholder={"Name"}
              value={this.state.addPokemonName}
              onChange={(e) => this.onChange(e, "addPokemonName")}
            ></input>
            <input
              placeholder={"Type"}
              value={this.state.addPokemonType}
              onChange={(e) => this.onChange(e, "addPokemonType")}
            ></input>
            <input
              placeholder={"Image Url"}
              value={this.state.addPokemonImage}
              onChange={(e) => this.onChange(e, "addPokemonImage")}
            ></input>
            <button onClick={this.addPokeToDB}>Add To Pokedex</button>
          </form>
        ) : null}
        <PokeDex
          pokedex={this.state.pokedex}
          changeDisplay={this.changeDisplay}
          onChange={this.onChange}
          delete={this.delete}
          changeName={this.changeName}
        />
      </div>
    );
  }
}

export default App;
