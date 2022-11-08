import MainNavbar from "components/Navbars/MainNavbar";
import RentalModal from "components/Modals/RentalModal";
import { getAllBoats } from "queries/RentalQueries";
import React from "react";

import {
    Badge,
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Row,
    UncontrolledCarousel,
} from "reactstrap";
import MainFooter from "components/Footers/MainFooter";

class Rentals extends React.Component {
    state = {
        boats: [],
        boatModal: false,
        selectedBoat: null,
        startDate: null,
        endDate: null
    };

    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;

        getAllBoats().then(boatList => {
            this.setState({
                boats: boatList
            });
        });
    }

    toggleModal() {
        this.setState({
            boatModal: !this.state.boatModal,
            startDate: null,
            endDate: null
        });
    }

    render() {
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
                        {this.state.boats.map((boat, index) => {
                            const boatImages = [
                                {
                                    src: "https://images.boats.com/resize/1/42/90/7824290_20210316113658249_1_LARGE.jpg?t=1615919821000",
                                    altText: '',
                                    caption: '',
                                    header: ''
                                },
                                {
                                    src: "https://images.bvimedia.ca/vehicles/photos/04/77/047714_2013_tahoe_Runabout_Boats_Q5i.jpg",
                                    altText: '',
                                    caption: '',
                                    header: ''
                                }
                            ]
                            return (<Card key={index} className="card-lift--hover shadow border-0 mb-4">
                                <CardBody className="py-5">
                                    <Row>
                                        <Col className="d-flex align-items-center" xs={12} md={4}>
                                            <UncontrolledCarousel interval={false} items={boatImages} />
                                        </Col>
                                        <Col xs={12} md={8}>
                                            
                                            <h4 className="text-primary text-uppercase">
                                            {boat.name}
                                            </h4>
                                            <Badge color="primary" pill className="mr-1 mb-2">
                                                Premium
                                            </Badge>
                                            <Badge color="primary" pill className="mr-1 mb-2">
                                                Bowrider
                                            </Badge>
                                            <div className="d-flex">
                                                <p className="description mt-3 mr-4">
                                                    <i className="fa fa-arrows-h" /> {boat.length}
                                                </p>
                                                <p className="description mt-3">
                                                    <i className="fa fa-users" /> {boat.capacity} People
                                                </p>
                                            </div>
                                            <div className="d-flex">
                                                {Object.keys(boat.price).map((key, i) => {return <p key={i}>{key}: {boat.price[key]}&nbsp;&nbsp;</p>})}
                                            </div>
                                            <Button
                                            className="mt-4"
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.setState({
                                                    selectedBoat: boat
                                                });
                                                this.toggleModal();
                                            }}
                                            >
                                            Reserve
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>);
                        })}
                    </Container>
                    <RentalModal
                        toggleModal={this.toggleModal}
                        isOpen={this.state.boatModal}
                        boat={this.state.selectedBoat}
                    />
                </section>
                <MainFooter />
            </>
        )
    }
}

export default Rentals;