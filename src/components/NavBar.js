import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      selectedCountry: "India"
    };
  }

  handleCategoryClick = (category) => {
    this.setState({ selectedCategory: category });
    this.props.onCategoryChange(category); // Pass the selected category back to the parent component
    console.log("from navbar", category)
  };


  handleCountryClick = (country) => {
    this.props.onCountryChange(country)
    console.log("froM navbar", country)
  }

  render() {
    const { selectedCategory, selectedCountry } = this.state;
    const { country, countries, countryFull } = this.props;
    return (
      <div> 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                
                {this.props.categories.map(category => (
                  <li className="nav-item" key={category}>
                  <Link className={`nav-link ${selectedCategory === category ? 'active' : ''}`} to={`/${category.toLowerCase()}`} onClick={() => this.handleCategoryClick(category)}>
                    {category}
                  </Link>
                </li>
                  )) }
              </ul>

                <li className="nav-item dropdown navbar-nav me-3 mb-2 mb-lg-0">
                  <img src={`https://flagsapi.com/${country.toUpperCase()}/flat/32.png`} />
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {countryFull}
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {Object.entries(countries).map(([key, value]) => (
                      <li key={key} style={{ listStyle: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img src={`https://flagsapi.com/${key.toUpperCase()}/flat/32.png`} alt={key} style={{ marginRight: '5px' }} />
                          <Link className={`dropdown-item ${selectedCountry === country ? 'active' : ''}`} to="#" onClick={() => this.handleCountryClick(key)}>
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
}

export default NavBar;