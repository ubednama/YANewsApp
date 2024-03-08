import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div>
        <div className="spinner-border" role="status">
            <span className="sr-only"></span>
        </div>
      </div>
    )
  }
}
