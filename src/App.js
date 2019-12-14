import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const corsUrl = "https://cors-anywhere.herokuapp.com/";
  const [planeta, setPlaneta] = useState({
    clima: '',
    populacao: '',
    terrain: '',
    filmes: [],
    nome: 'Planet Name'
  })
  const [loading, setLoading] = useState(false);

  async function getRandomPlanet() {
    let min = 1;
    setLoading(true);
    let res = await axios.get(`https://swapi.co/api/planets/`)    
    let random = min + Math.random() * (res.data.count - min);
    let resContent = await axios.get(`https://swapi.co/api/planets/`+Math.floor(random))
    
    updatePlaneta(resContent.data)
  }
  
  async function updatePlaneta(props) {
    var arrayFilmes = [];
    var listaFilmes = props.films;
    for (var i = 0; i < listaFilmes.length; i++ ){
      let filme = listaFilmes[i];
      if (filme != null) {
        var nomeFilmeData = await axios.get(corsUrl+filme);        
        if (listaFilmes.length > 0 && i !== listaFilmes.length -1) {
          nomeFilmeData.data.title += ",";
        }
        arrayFilmes.push(nomeFilmeData.data.title);
      }
    }

    setPlaneta({
      nome: props.name,
      populacao: props.population,
      filmes: arrayFilmes,
      clima: props.climate,
      terrain: props.terrain
    })
    setLoading(false);
  }

  return (
    <div className="App container">
      <div id="app-container">
          <div className="card w-50">
            <div id='title-planet' className="card-header">{ planeta.nome }</div>
            <div className="card-body">
              <h5 id="population-planet"> Population : { planeta.populacao }</h5>
              <h5 id="climate-planet"> Climate : { planeta.clima }</h5>
              <h5 id="terrain-planet"> Terrain : { planeta.terrain }</h5>
              <h6 id="movies-planet"> Featured in : { planeta.filmes }</h6>
            </div>
          </div>
      </div>
      { loading ? 
      <div className="spinner-border" role="status"></div> :
      <button type='button' id="button-planet" className='btn btn-primary btn-lg' onClick={ getRandomPlanet }> Next</button>
      }      
    </div>
  );
}

export default App;
