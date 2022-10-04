import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import Header from "components/Headers/AdminHeader";
import React from "react";
import { connect } from "react-redux";
import { Card, Col, Container, Row } from "reactstrap";
import { getAllReservations } from "queries/ReservationQueries";


class ReservationCalendar extends React.Component {
    state = {
        reservations: []
    };

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        
        getAllReservations(this.props.user.tokens.access.token).then(response => {
            return response.json();
        }).then(reservationList => {
            this.setState({
                reservations: reservationList
            });
        });
    }

    render() {
        return (<>
            <Header />
            <Container fluid className="mt--7">
                <Row>
                    <Col>
                        <Card className="shadow">
                            <FullCalendar
                                eventMinWidth={200}
                                height={1000}
                                plugins={[dayGridPlugin]}
                                initialView="dayGridMonth"
                                events={this.state.reservations.map(res => {
                                    return {
                                        id: res._id,
                                        start: new Date(res.startDay),
                                        end: new Date(res.endDay),
                                        allDay: true,
                                        title: `${res.requestName}`,
                                        url: '/',
                                        editable: true
                                    }
                                })}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>)
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return { user };
}
export default connect(mapStateToProps)(ReservationCalendar);