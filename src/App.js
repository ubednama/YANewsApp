import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


// let size = 4;
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
// console.log("from home api",api)

const App =() => {

  const [country, setCountry] = useState("in");
  const [category, setCategory] = useState('general')
  const [progress, setProgress] = useState(0)
  const [pageSize, setPageSize] = useState(6);


  // const handlePageSizeChange = (size) => {
  //   setSize(size)
  //   // console.log("for page size",state.size)
  // }
  
  // const handleCategoryChange = (category) => {
  //   setCategory( category )
  //   // console.log(state)
  // };
  
  // const handleCountryChange = (country) => {
  //   setCountry({country, page: 1})
  //   console.log("from app ",country)
  // }

  // setProgress = (progress) => {
  //   setProgress(progress)
  // }

  // const { category, country, size, progress } = state;
  // console.log("from app", category)
  return (
    <Router>
    <div>
    <NavBar country={country} countryFull={countries[country]} setCategory={setCategory} setCountry={setCountry} countries={countries} categories={categories} />
    <LoadingBar
      height={2.5}
      color='#f11946'
      progress={progress}
    />
    <Routes>
      <Route exact path='/' element={<News setProgress={setProgress} pageSize={pageSize} country={country} API={api} category='general' countries={countries} />} />
      <Route exact path='/:country' element={<News setProgress={setProgress} pageSize={pageSize} country={country} API={api} category='general' countries={countries} />} />
      <Route exact path="/:country/:category" element={<News setProgress={setProgress} pageSize={pageSize} country={country} API={api} category={category} countries={countries} />} />
    </Routes>
  </div>
  </Router>
  )
}

export default App;