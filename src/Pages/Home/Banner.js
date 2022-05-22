import React from 'react';
import { Carousel } from 'react-bootstrap';
import banner1 from '../../images/banner1.jpg';
import banner2 from '../../images/banner2.jpg';
import banner3 from '../../images/banner3.jpg';

const Banner = () => {
    return (
        <div className=''>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner1}
                        alt="Banner 1"
                    />
                    <Carousel.Caption>
                        <h3>Your work, Our Tools</h3>
                        <p>You can by wholesale tools from us</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner2}
                        alt="Banner 2"
                    />

                    <Carousel.Caption>
                        <h3>You measure your work flow, we measure your happiness</h3>
                        <p>Buy tools in a cheap rate and make your business broad</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner3}
                        alt="Banner 3"
                    />

                    <Carousel.Caption>
                        <h3>Explore the tools world with Tools Express</h3>
                        <p>You will find all your necessary tools here</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Banner;