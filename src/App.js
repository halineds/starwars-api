import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import Home from './components/Home';
import People from './components/People';
import Planets from './components/Planets';
import Starships from './components/Starships';

function App() {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPeople() {
      let res = await fetch('http://swapi.dev/api/people/?format=json');
      let data = await res.json();
      setPeople(data.results);
      setLoading(false);
    }

    async function fetchPlanets() {
      let res = await fetch('https://swapi.dev/api/planets/?format=json');
      let data = await res.json();
      setPlanets(data.results);
      setLoading(false);
    }

    async function fetchStarships() {
      let res = await fetch('https://swapi.dev/api/starships/?format=json');
      let data = await res.json();
      setStarships(data.results);
      setLoading(false);
    }

    fetchPeople();
    fetchPlanets();
    fetchStarships();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Container>
          {loading ? (
            <Dimmer active inverted>
              <Loader inverted> Loading</Loader>
            </Dimmer>
          ) : (
            <Routes>
              <Route exact path='/' element={<Home/>}></Route>
              <Route exact path='/people' element={<People data={people}/>}></Route>
              <Route exact path='/planets' element={<Planets data={planets}/>}></Route>
              <Route exact path='/starships' element={<Starships data={starships} />}></Route>
            </Routes>
          )}

        </Container>
      </Router>
    </>

  );
}

export default App;
