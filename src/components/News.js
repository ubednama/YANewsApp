import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import { useParams } from 'react-router-dom';

// const news = require('./sampleNews.json')

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
  }
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string.isRequired,
  }
  
  // articles = parsedData.articles

  constructor(){
    super();
    console.log("constructor from news")
    this.state = {
    // state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 1,
    }
  }


  // predefined in react
  async componentDidMount(){
    await this.fetchData();
  };
  
  componentDidUpdate(prevProps, prevState) {
    // Fetch data only if category or page has changed
    if (prevProps.category !== this.props.category || prevState.page !== this.state.page || prevProps.country !== this.props.country) {
        // Set page to 1 if country has changed
        if (prevProps.country !== this.props.country) {
          this.setState({ page: 1 });
        }
      this.fetchData();
    }
  }

  fetchData = async() => {
    this.setState({loading: true})
    const { country, pageSize, category, API } = this.props;     // to access category from route
    // for good example of this see temp.js

    const {page} = this.state
    
    
    
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API}&page=${page}&pageSize=${pageSize}`
      // let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=9a7bcf4297e1461e8c57f64e868b38da&page=${page}&pageSize=${pageSize}`
      
      console.log("from news", url);
      console.log("from fetch", category)
      
      let response = await fetch(url)
      let parsedData = await response.json();
      this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false})
      
    } catch (error) {
      console.log("error while fetching url ", error);
      // this.setState({loading: false})
    }
  };
  
  // handleNextClick = () => {
  //   const nextPage = this.state.page + 1;
  //   this.setState({page: nextPage}, () => {
  //     console.log(this.state.page);
  //     this.fetchData();
  //   })};

  // handlePrevClick = () => {
  //   const prevPage = this.state.page - 1;
  //   this.setState({page: prevPage}, () => {
  //     console.log(this.state.page);
  //     this.fetchData();
  //   });
  // }


  handleNextClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 })
      // () => this.fetchData()
    );
    console.log("next", this.state.page)
  };

  handlePrevClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 })
      // () => this.fetchData()
    );
    console.log("prev ", this.state.page)
  };


  
  
  render() {
    // console.log(this.state.articles[0]);
    const { articles, loading, page, totalArticles } = this.state;
    
    return (
      <div className='container my-3'>
        <h3>YANews Portal</h3>
        <h5>Headline</h5>
        <div className="d-flex justify-content-center">{loading && <Spinner/>}</div>
        <div className="row">
        {articles.map((element)=>{
          return <div className="col-md-4" key={element.url}> <NewsItem title={element.title?element.title.slice(0,80):""} description={element.description?element.description.slice(0,110):''} imageUrl={element.urlToImage} articleLink={element.url}/></div>
        })}
        </div>
        <div className="d-flex justify-content-between my-2 mx-2">
        <button disabled={page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>← Previous</button>
        <button disabled={page >= Math.ceil(totalArticles / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next →</button>
        </div>
      </div>
    )
  }
}