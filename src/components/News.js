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
      
      console.log("from news", url);
      console.log("from fetch", category)
      
      let response = await fetch(url)
      let parsedData = await response.json();
      this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false})
      
    } catch (error) {
      console.log("error while fetching url ", error);
      this.setState({loading: true})
    }
  };

  formatPublishedDate(publishedAt){
    console.log("from format date ", publishedAt)
    const publishedDate = new Date(publishedAt);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - publishedDate.getTime();
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(minutesDifference / 60);

    if (hoursDifference < 1) {
      return `${minutesDifference} minutes ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hours ago`;
    } else if (hoursDifference < 48) {
      return 'Yesterday ' + publishedDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    } else {
      const day = publishedDate.getDate();
      const month = publishedDate.getMonth() + 1;
      const hours = publishedDate.getHours();
      const minutes = publishedDate.getMinutes();
      const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month} ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
      console.log("formattedDate")
      return formattedDate;
  }
  };

  
  handleNextClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 })
      );
      console.log("next", this.state.page)
  };
    
  handlePrevClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 })
      );
      console.log("prev ", this.state.page)
  };
      
      
      
      
  render() {
    // console.log(this.formatPublishedDate(this.state.element.publishedAt));
    // console.log(this.state.articles[0]);
    const { articles, loading, page, totalArticles} = this.state;
    
    return (
      <div className='container my-3'>
        <h3>YANews Portal</h3>
        <h5>Headline</h5>
        <div className="d-flex justify-content-center">{loading && <Spinner/>}</div>
        <div className="row">
        {articles.map((element)=>{
          return <div className="col-md-4" key={element.url}> <NewsItem title={element.title?element.title.slice(0,80):""} description={element.description?element.description.slice(0,110):''} imageUrl={element.urlToImage} articleLink={element.url} author={element.author} publishedDate={this.formatPublishedDate(element.publishedAt)}/></div>
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