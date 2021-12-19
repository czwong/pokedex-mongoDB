import React from "react";
import axios from "axios";
import PokeDex2 from "./PokeDex2.jsx";

class App2 extends React.Component {
  constructor() {
    super();

    this.state = {
      pokedex: [],
      type: "",
      insert: false,
      inputName: "",
      inputType: "",
      inputImg: "",
    };

    this.onChangeType = this.onChangeType.bind(this);
    this.getType = this.getType.bind(this);
    this.onClickInsert = this.onClickInsert.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    axios
      .get("/pokemon")
      .then((reponse) => {
        this.setState({ pokedex: reponse.data });
      })
      .catch((err) => console.log(err));
  }

  getType() {
    axios
      .get(`/pokemon/${this.state.type}`)
      .then((reponse) => {
        this.setState({ pokedex: reponse.data });
      })
      .catch((err) => console.log(err));
  }

  onChangeType(e) {
    e.preventDefault();
    this.setState(
      {
        type: e.target.value,
      },
      this.getType
    );
  }

  onClickInsert(e) {
    e.preventDefault();
    console.log("insert button");
    this.setState({
      insert: !this.state.insert,
    });
  }

  onSave() {
    axios
      .post("/pokemon", {
        name: this.state.inputName,
        type: this.state.inputType,
        img: this.state.inputImg,
      })
      .then(this.get)
      .catch((err) => console.log(err));
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>Pokemon!</h1>
        <button>Show All</button>
        <select id="cars" onChange={this.onChangeType}>
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
        <button onClick={this.onClickInsert}>INSERT</button>
        {this.state.insert ? (
          <form>
            <input
              name="inputName"
              value={this.state.inputName}
              placeholder="name"
              onChange={this.onInputChange}
            ></input>
            <input
              name="inputType"
              value={this.state.inputType}
              placeholder="type"
              onChange={this.onInputChange}
            ></input>
            <input
              name="inputImg"
              value={this.state.inputImg}
              placeholder="img"
              onChange={this.onInputChange}
            ></input>
            <button onClick={this.onSave}>Save</button>
          </form>
        ) : null}
        <div>
          {this.state.pokedex.map((pokemon, index) => {
            return <PokeDex2 pokemon={pokemon} key={index} />;
          })}
        </div>
      </div>
    );
  }
}

export default App2;
