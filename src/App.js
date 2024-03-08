import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";


let size = 3;
let countries = {
  'in': 'India',
  'us': 'United States',
  'ar': 'Argentina',
  'at': 'Austria',
  'au': 'Australia',
  'be': 'Belgium',
  'bg': 'Bulgaria',
  'br': 'Brazil',
  'ca': 'Canada',
  'ch': 'Switzerland',
  'cn': 'China',
  'co': 'Colombia',
  'cu': 'Cuba',
  'cz': 'Czech Republic',
  'de': 'Germany',
  'eg': 'Egypt',
  'fr': 'France',
  'gb': 'United Kingdom',
  'gr': 'Greece',
  'hk': 'Hong Kong',
  'hu': 'Hungary',
  'id': 'Indonesia',
  'ie': 'Ireland',
  'il': 'Israel',
  'it': 'Italy',
  'jp': 'Japan',
  'kr': 'South Korea',
  'lt': 'Lithuania',
  'lv': 'Latvia',
  'ma': 'Morocco',
  'mx': 'Mexico',
  'my': 'Malaysia',
  'ng': 'Nigeria',
  'nl': 'Netherlands',
  'no': 'Norway',
  'nz': 'New Zealand',
  'ph': 'Philippines',
  'pl': 'Poland',
  'pt': 'Portugal',
  'ro': 'Romania',
  'rs': 'Serbia',
  'ru': 'Russia',
  'sa': 'Saudi Arabia',
  'se': 'Sweden',
  'sg': 'Singapore',
  'si': 'Slovenia',
  'sk': 'Slovakia',
  'th': 'Thailand',
  'tr': 'Turkey',
  'tw': 'Taiwan',
  'ua': 'Ukraine',
  'ae': 'United Arab Emirates',
  've': 'Venezuela',
  'za': 'South Africa'
};

const categories = [
  'Business',
  'Entertainment',
  'Health',
  'Science',
  'Sports',
  'Technology'
];

let api = process.env.REACT_APP_API;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: 'general',
      country: 'in'
    };
  }

  
  // setState()
  // console.log(state)
  //this is same as above (this is a state variable named state which we can update using setState)
  // state = {
  //   category: 'general', // Default category
  // };
  
  handleCategoryChange = (category) => {
    this.setState({ category })
    console.log(this.state)
  };
  
  handleCountryChange = (country) => {
    this.setState({country, page: 1})
    console.log("from app ",country)
  }

    render() {
      const { category, country } = this.state;
      console.log("from app", category)
    return (
      <Router>
      <div>
      <NavBar country={country} countryFull={countries[country]} onCategoryChange={this.handleCategoryChange} onCountryChange={this.handleCountryChange} countries={countries} categories={categories}/>
      <Routes> {/* Use Routes instead of Switch */}
      <Route exact path='/' element={<News pageSize={size} country={country} API={api} category='general' countries={countries} />} />
        <Route exact path="/:category" element={<News pageSize={size} country={country} API={api} category={category} countries={countries} />} /> {/* Define your route */}
      </Routes>
    </div>
    </Router>
    )
  }
}