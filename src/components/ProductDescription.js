import React, { Component } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

class ProductDescription extends Component {
    constructor() {
        super();
        this.state = {
            heading: 'The Response from the AI will be displayed here...',
            response: 'Wait for the response...',
            isLoading: false
        };
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        const productName = formDataObj.productName;

        this.setState({ isLoading: true });

        try {
            const response = await fetch("http://localhost:5000/product-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ product: productName })
            });

            const data = await response.json();

            this.setState({
                heading: `AI Product Description Suggestions for: ${productName}`,
                response: data.productDetails.trim(),
                isLoading: false
            });
        } catch (error) {
            console.error("API error:", error);
            this.setState({
                heading: "Error",
                response: "Failed to get response from AI. Please try again.",
                isLoading: false
            });
        }
    };

    render() {
        return (
            <Container>
                <br />
                <h1>Generate Product Descriptions</h1>
                <h4>Enter the product name to generate a professional AI-powered description.</h4>
                <br />
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>What product would you like to describe?</Form.Label>
                        <Form.Control
                            type="text"
                            name="productName"
                            placeholder="Enter product name"
                            required
                        />
                        <Form.Text className="text-muted">
                            Provide specific details for better results.
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" size="lg" type="submit" disabled={this.state.isLoading}>
                        {this.state.isLoading ? 'Generating...' : 'Get AI Suggestions'}
                    </Button>
                </Form>

                <br />

                <Card>
                    <Card.Body>
                        <Card.Title><h2>{this.state.heading}</h2></Card.Title>
                        <hr />
                        <Card.Text>
                            <h5 style={{ whiteSpace: "pre-wrap" }}>{this.state.response}</h5>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default ProductDescription;