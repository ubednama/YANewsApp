import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {

  const [selectedCountry, setSelectedCountry] = useState("in");
  const [selectedCategory, setSelectedCategory] = useState("General")

  const {setCategory, setCountry, setPageSize} = props;
  
  const handleCategoryClick = (category) => {
    setCategory(category);
    setSelectedCategory(category)
    console.log("from navbar category ", category)
  };


  const handleCountryClick = (country) => {
    setCountry(country);
    setSelectedCountry(country)
    console.log("from navbar country ", country)
  }

  const handlePageSizeClick = (size) =>{
    // setPageSize(size)
    // props.onPageSizeChange(size);
    console.log("Page size change", size)
  }

    // const { selectedCategory, selectedCountry } = state;
    const { country, countries, countryFull, pageSize } = props;

    const dropdownItems = [];
    for (let i = 3; i <= 30; i += 3) {
      dropdownItems.push(
        <li key={i}>
          <button className='dropdown-item' onClick={()=> handlePageSizeClick(i)}>
            {i}
          </button>
        </li>
      );
    }

  return (
    <div> 
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            YANews
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              
              {props.categories.map(category => (
                <li className="nav-item" key={category}>
                  <Link className={`nav-link ${selectedCategory === category ? 'active' : ''}`} to={`/${country}/${category.toLowerCase()}`} onClick={() => handleCategoryClick(category)} rel="noreferrer">
                    {category}
                  </Link>
                </li>
                )) }
            </ul>
            <li className="nav-item dropdown navbar-nav me-3 mb-2 mb-lg-0">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {pageSize} articles
              </Link>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {dropdownItems}
              </ul>
            </li>
            <li className="nav-item dropdown navbar-nav me-3 mb-2 mb-lg-0">
              <img src={`https://flagsapi.com/${country.toUpperCase()}/flat/32.png`} alt={`${country}`} />
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {countryFull}
              </Link>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {Object.entries(countries).map(([key, value]) => (
                  <li key={key} style={{ listStyle: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={`https://flagsapi.com/${key.toUpperCase()}/flat/32.png`} alt={key} style={{ marginRight: '5px' }} />
                      <Link className={`dropdown-item ${selectedCountry === country ? 'active' : ''}`} to={`/${key}`} onClick={() => handleCountryClick(key)} rel="noreferrer">
                        {value}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar; 