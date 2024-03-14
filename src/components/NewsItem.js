import React from 'react'

const NewsItem = (props) => {

  console.log("NewsItem props:", props)
  
  let {title, description, imageUrl, articleLink, author, publishedDate, source } = props;
  return (
    <div className='my-3'>
      <div className="card" style={{ width: "18rem" }}>
        <img src={imageUrl?imageUrl:"https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} className="card-img-top" alt="..." style={{ height: "10rem" }}/>
        <div className="card-body" style={{ height: "23rem" }}>
          <h5 className="card-title" style={{ maxHeight: "6rem", overflow: "hidden" }}>{title}</h5>
          <p className="card-text" style={{ maxHeight: "9rem", overflow: "hidden" }}>{description}...</p>
          <p className='card-text' style={{ bottom: "2.2rem", maxWidth: "16rem", position: "absolute" }}><small className='text-muted'>Updated {author? `by ${author}` : ``} {publishedDate}</small></p>
          <a href={`${articleLink}`} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary" style={{ position: "absolute", bottom: "1rem" }}>Read more @ {source}</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem;