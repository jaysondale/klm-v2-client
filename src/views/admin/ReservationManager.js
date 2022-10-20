import MainNavbar from "components/Navbars/MainNavbar";
import React from "react";
import { connect } from "react-redux";

import {
    Card,
    CardHeader,
    Container,
    Row,
    Table
} from "reactstrap";

import Header from "components/Headers/AdminHeader";
import { getPendingReservations } from "queries/ReservationQueries";
import PendingRequestModal from "components/Modals/PendingRequestModal";


class ReservationManager extends React.Component {
    state = {
        reservations: [],
        requestModal: false,
        selectedRequest: null
    };

    constructor(props) {
        super(props);
        this.toggleRequestModal = this.toggleRequestModal.bind(this);
    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;

        getPendingReservations(this.props.user.tokens.access.token).then(reservations => {
            this.setState({ reservations });
        });
    }

    formatDate(rawDate) {
        const date = new Date(rawDate);
        return date.toLocaleDateString();
    }

    toggleRequestModal(reservationRequest) {
        this.setState({
            requestModal: !this.state.requestModal,
            selectedRequest: reservationRequest
        })
    }

    render() {
        return (<>
            <Header />
            <Container className="mt--7 fluid">
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3>Pending Requests</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush table-hover" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Rental</th>
                                        <th scope="col">Destination</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.reservations.map((res, i) => 
                                        <tr className="clickable-row" onClick={() => {this.toggleRequestModal(res)}} key={i}>
                                            <td scope="col">{res.requestName}</td>
                                            <td scope="col">{res.requestEmail}</td>
                                            <td scope="col">{res.boatName}</td>
                                            <td scope="col">{res.destination}</td>
                                            <td scope="col">{this.formatDate(res.startDay)}</td>
                                            <td scope="col">{this.formatDate(res.endDay)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>
            <PendingRequestModal
                toggleModal={this.toggleRequestModal}
                isOpen={this.state.requestModal}
                reservation={this.state.selectedRequest}
                setReservation={(update) => {
                    this.setState({
                        selectedRequest: Object.assign({}, this.state.selectedRequest, update)
                    })
                }}
            />
        </>);
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return { user };
}

export default connect(mapStateToProps)(ReservationManager);