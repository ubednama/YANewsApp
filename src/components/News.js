import React, { useEffect, useState } from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

  const {category, country, pageSize, API, setProgress} = props;
  
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);
  // const [hasMore, setHasMore] = useState(true);

  
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchData = async() => {
    
    setLoading(true);
    setProgress(10);
    
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API}&page=${page}&pageSize=30`
      setLoading(true)
      console.log("from news", url);
      
      let response = await fetch(url)
      setProgress(50)
      
      let parsedData = await response.json();
      setProgress(70)
      console.log(parsedData)
      setArticles(parsedData.articles);
      console.log('1st fetch ',articles.length, typeof articles)
      setTotalArticles(parsedData.totalResults)     //this sets total articles
      setLoading(false)
      setProgress(100);

      // console.log()
      
    } catch (error) {
      setLoading(true);
      console.error("Error while fetching data:", error);
    }
  };

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(category)} - YANewsApp`
    fetchData();

  },[page, category, country, pageSize]);

  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1:  return 'st';
      case 2:  return 'nd';
      case 3:  return 'rd';
      default: return 'th';
    }
  };

  const formatPublishedDate =(publishedAt) => {
    // console.log("from format date ", publishedAt)
    const publishedDate = new Date(publishedAt);    //creating new Date obj using publishedAt(article published date)
    
    if (publishedDate.getFullYear() === 1970) {
      return ``;
    }

    const currentDate = new Date();                 //creating new Date obj using currentDate(actual todays date)
    // console.log(currentDate, publishedDate)
    const timeDifference = currentDate.getTime() - publishedDate.getTime();
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));       //will give largest int less then or equal to give argument
    // console.log(minutesDifference)
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
  
    if (minutesDifference < 60) {
      return `${minutesDifference} minutes ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hours ${(minutesDifference % 60)} minutes ago`;
    } else if (hoursDifference < 48) {
      return 'Yesterday at ' + publishedDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    } else if (daysDifference < 7) {
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const weekday = weekdays[publishedDate.getDay()];
      return `${weekday} ${publishedDate.getDate()}${getOrdinalSuffix(publishedDate.getDate())}`;
    } else if (daysDifference < 365) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const month = months[publishedDate.getMonth()];
      return `${month} ${publishedDate.getDate()}${getOrdinalSuffix(publishedDate.getDate())}`;
    } else {
      const month = publishedDate.getMonth() + 1;
      const year = publishedDate.getFullYear();
      return `${month}/${publishedDate.getDate()}/${year}`;
    }
  };

  const fetchMoreData = async() => {

    let nextPage = page + 1;

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API}&page=${nextPage}&pageSize=30`;
    setPage(page+1) 


    console.log("from news", url);

    // try {
      let response = await fetch(url);
      let parsedData = await response.json();

      console.log('Number of articles before concatenation:', parsedData.articles.length);

      setArticles(prevArticles => Object.assign({}, prevArticles, parsedData.articles));

      // setArticles(prevArticles => ({...prevArticles, ...parsedData.articles}));
      // setTotalArticles(parsedData.totalResults)

      // let totalPages = Math.ceil(parsedData.totalResults / pageSize);
      // setHasMore(nextPage < totalPages);

      console.log('more fetch ',articles.length)
      
      setPage(nextPage);
      // } catch (error) {
      //   console.log("Error while fetching data:", error);
      //   setLoading(false);
      // }
  };

  console.log("articles length ",articles.length, typeof articles)

    
  return (
    <div style={{padding:"2%", marginTop: "50px" }}>
      <h3>YANews Portal</h3>
      <h5>Top {`${capitalizeFirstLetter(props.category)}`} Headlines</h5>
      <div className="d-flex justify-content-center">{loading && <Spinner/>}</div>
      <InfiniteScroll
      dataLength={totalArticles}
      next={fetchMoreData}
      hasMore={articles.length !== totalArticles}
      // hasMore={hasMore}
      // loader={<div className="d-flex justify-content-center">{loading && <Spinner/>}</div>}
      >
        <div className="container">
          <div className="row">
          {Object.entries(articles).map(([index, article])=>{
          return <div className="col-md-4" key={index}>
            <NewsItem title={article.title?article.title:""} description={article.description?article.description:''} imageUrl={article.urlToImage} articleLink={article.url} author={article.author} publishedDate={formatPublishedDate(article.publishedAt)} source={article.source.name}/>
            </div>
        })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="d-flex justify-content-between my-2 mx-2">
//       <button disabled={page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>← Previous</button>
//       <button disabled={page >= Math.ceil(totalArticles / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next →</button>
//       </div> */}
    </div>
  )
}

News.defaultProps = {
  country: 'in'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string.isRequired,
}

export default News;