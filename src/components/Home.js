import React from 'react'
import { Component } from 'react'
import Display from './Display'
import { Container, Row, Col, Carousel } from 'react-bootstrap'
import retailImg from '../RetailLogo.png'

class Home extends Component {
    render() {
        return (
            <div>
               <br/>
                <Container>
                 <Carousel>
                   <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src={retailImg}
                        alt="Retail Blogs Information" />
                    </Carousel.Item>     
                 </Carousel>
                 <br/>
                 <br/>
                 <h1> Online Artificial Intelligence with OpenAI </h1>
                 <p> Start Exploring to generate the AI Content. </p>   
                 <br/>     
                 <br/>
            <Row>
               <Col>
               <Display
                    header="Product Descriptions"
                    title="Generate the Product Description"
                    text="Generate product descriptions for any types of products, simply enter the Product name to get started."
                    theLink="/Product-Description" />
               </Col> 
            </Row>
                  <br/>
                </Container>
                
            </div>
        )
    }
}
export default Home