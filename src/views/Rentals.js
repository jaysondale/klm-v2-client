import MainNavbar from "components/Navbars/MainNavbar";
import React from "react";

import {
    Badge,
    Button,
    Card,
    CardBody,
    Container,
    Row
} from "reactstrap";

class Rentals extends React.Component {
    state = {
        boats: []
    };

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;

        fetch(`${process.env.REACT_APP_API_BASE}/boats`)
        .then(response => {
            return response.json()
        }).then(boatList => {
            this.setState({
                boats: boatList
            });
        });
    }

    render() {
        console.log(this.state);
        return (
            <>
                <MainNavbar />
                <section className="section section-shaped lg pb-150">
                    <div className="shape shape-style-1 shape-default">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                   <Container className="pt-lg-7">
                        <Row className="d-flex flex-column align-items-center">
                            <h1 className="text-white display-1">Rental Fleet</h1>
                            <p></p>
                        </Row>
                   </Container>
                </section>
                <section className="section">
                    <Container>
                        {this.state.boats.map(boat => {
                            return (<Card className="card-lift--hover shadow border-0">
                                <CardBody className="py-5">
                                    <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                                    <i className="ni ni-check-bold" />
                                    </div>
                                    <h6 className="text-primary text-uppercase">
                                    {boat.name}
                                    </h6>
                                    <p className="description mt-3">
                                    Argon is a great free UI package based on Bootstrap
                                    4 that includes the most important components and
                                    features.
                                    </p>
                                    <div>
                                    <Badge color="primary" pill className="mr-1">
                                        design
                                    </Badge>
                                    <Badge color="primary" pill className="mr-1">
                                        system
                                    </Badge>
                                    <Badge color="primary" pill className="mr-1">
                                        creative
                                    </Badge>
                                    </div>
                                    <Button
                                    className="mt-4"
                                    color="primary"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    >
                                    View
                                    </Button>
                                </CardBody>
                            </Card>);
                        })}
                    </Container>
                </section>
            </>
        )
    }
}

export default Rentals;