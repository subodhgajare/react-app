import React from 'react'

function Carousel() {
  let carouselImages = [
    "images/carousel/image1.jpg",
    "images/carousel/image2.jpg",
    "images/carousel/image3.jpg",
  ];

  return (
    <section id="slider">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div id="slider-carousel" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#slider-carousel" data-slide-to="0" className="active"></li>
                <li data-target="#slider-carousel" data-slide-to="1"></li>
                <li data-target="#slider-carousel" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                {carouselImages.map((item, index) =>
                  <div className={`item ${index === 0 ? 'active' : ''}`} key={index}>
                    <div className="col-sm-12">
                      <img src={item} className="carousel-cake img-responsive" alt="" />
                      <img src="/images/home/pricing.png"  className="pricing" alt="" />
                    </div>
                  </div>
                )}
              </div>
              <a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
                <i className="fa fa-angle-left"></i>
              </a>
              <a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
                <i className="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
