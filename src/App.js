/* eslint-disable react/no-unused-state */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import pf from 'petfinder-client';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider } from './SearchContext';
import Navbar from './Navbar';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

const GetDetails = Loadable({
  loader: () => import('./Details'),
  loading() {
    return <h1>Loading...</h1>;
  },
});

const GetSearchParams = Loadable({
  loader: () => import('./SearchParams'),
  loading() {
    return <h1>Loading...</h1>;
  },
});

const GetResults = Loadable({
  loader: () => import('./Results'),
  loading() {
    return <h1>Loading...</h1>;
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: 'Seattle, WA',
      animal: '',
      breed: '',
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds,
    };
  }

  getBreeds() {
    const { animal } = this.state;
    if (animal) {
      petfinder.breed
        .list({ animal })
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed,
            });
          } else {
            this.setState({ breeds: [] });
          }
        })
        .catch(console.error);
    } else {
      this.setState({
        breeds: [],
      });
    }
  }

  handleLocationChange = event => {
    this.setState({
      location: event.target.value,
    });
  };

  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
      },
      this.getBreeds
    );
  };

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <Reduxprovider>
          <Provider value={this.state}>
            <Router>
              <GetResults path="/" />
              <GetDetails path="/details/:id" />
              <GetSearchParams path="/search-params" />
            </Router>
          </Provider>
        </Reduxprovider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
/* eslint-disable react/no-unused-state */
