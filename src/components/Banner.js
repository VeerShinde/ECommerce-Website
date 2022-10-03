import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from "./banner images/1.jpg"
import image2 from "./banner images/2.jpg"
import image3 from "./banner images/3.jpg"
import image4 from "./banner images/4.jpg"

// In banner we are making a slider which amazon website have.
// Using react carousel package.
const Banner = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1}
          alt="first slide"
        />
        <Carousel.Caption>
          <h3>Great Indian Festival</h3>
          <p>On First Purchase No Minimum Order.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Starting at 39INR.</h3>
          <p>Top deals on Home and decor.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third Slide"
        />

        <Carousel.Caption>
          <h3>Samsung Galaxy M13</h3>
          <p>Lowest Ever Price</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image4}
          alt="Fourth slide"
        />

        <Carousel.Caption>
          <h3>Never Before Price</h3>
          <p>Tripods, Batteries, Ring lights and more.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  );
}

export default Banner