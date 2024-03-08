import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, articleLink, author, publishedDate } = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl?imageUrl:"https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="card-img-top" alt="..." style={{ height: "150px" }}/>
          <div className="card-body" style={{ minHeight: "300px" }}>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className='card-text'><small className='text-muted'>Updated {author? `by ${author}` : ``} {publishedDate}</small></p>
            <a href={`${articleLink}`} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}
