import React from 'react'

class Carousel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      carouselImages: [
        "images/carousel/image1.jpg",
        "images/carousel/image2.jpg",
        "images/carousel/image3.jpg",
      ]
    }
  }

  render() {
    return (
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          {this.state.carouselImages.map((image, index) => {
            return (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <img src={process.env.PUBLIC_URL + image} className="d-block w-100" alt="..." />
              </div>
            )
          })}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

export default Carousel;
