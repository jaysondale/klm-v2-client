import MainNavbar from "components/Navbars/MainNavbar";
import React from "react";
import { connect } from "react-redux";

import {
    Card,
    CardBody,
    CardHeader,
    Container,
    Row,
    Table
} from "reactstrap";

import Header from "components/Headers/AdminHeader";


class ReservationManager extends React.Component {
    state = {};
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
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
                            <Table className="align-items-center table-flush" responsive>
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
                                    <tr>
                                        <td scope="col">Jayson Dale</td>
                                        <td scope="col">jaysondale1@gmail.com</td>
                                        <td scope="col">Tahoe Q5i</td>
                                        <td scope="col">Kennisis</td>
                                        <td scope="col">July 16, 2023</td>
                                        <td scope="col">July 17, 2023</td>
                                    </tr>
                                    <tr>
                                        <td scope="col">Jayson Dale</td>
                                        <td scope="col">jaysondale1@gmail.com</td>
                                        <td scope="col">Tahoe Q5i</td>
                                        <td scope="col">Kennisis</td>
                                        <td scope="col">July 16, 2023</td>
                                        <td scope="col">July 17, 2023</td>
                                    </tr>
                                    <tr>
                                        <td scope="col">Jayson Dale</td>
                                        <td scope="col">jaysondale1@gmail.com</td>
                                        <td scope="col">Tahoe Q5i</td>
                                        <td scope="col">Kennisis</td>
                                        <td scope="col">July 16, 2023</td>
                                        <td scope="col">July 17, 2023</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>);
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return { user };
}

export default connect(mapStateToProps)(ReservationManager);