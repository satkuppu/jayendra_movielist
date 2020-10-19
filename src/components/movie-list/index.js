import React, { Component } from "react";
import "./index.css";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      movieList: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  // event handler for user input
  handleChange (e) {
    this.setState({
      query: e.target.value,
    });
  }

  // event handler for search click action
  handleSearch() {
    const { query } = this.state;
    if (query.length === 4) {
      fetch (`https://jsonmock.hackerrank.com/api/movies?Year=${query}`)
      .then (response => response.json())
      .then (resp => {
        this.setState({
          movieList: resp.data
        })
      })
    }

  }

  render() {
    const { query , movieList} = this.state;
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input
            type="number"
            className="large"
            placeholder="Enter Year eg 2015"
            data-testid="app-input"
            value={query}
            onChange={this.handleChange}
          />
          <button className="" data-testid="submit-button" onClick={this.handleSearch}>Search</button>
        </section>
        
        <ul className="mt-50 styled" data-testid="movieList">
          {
            (movieList.length > 0) && movieList.map(movie => {
              return (
                <li key={movie.Title} className="slide-up-fade-in py-10" data-testid="app-title">
                  {movie.Title}
                </li>
              )
            })
          }
        </ul>
        {
          (query.length > 0 && movieList.length === 0)
          ? <div className="mt-50 slide-up-fade-in" data-testid="no-result">No Results Found</div>
          : null
        }
      </div>
    );
  }
}
