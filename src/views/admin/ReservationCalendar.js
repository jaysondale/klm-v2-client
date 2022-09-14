import Calendar from "components/Calendar/Calendar";
import Header from "components/Headers/AdminHeader";
import React from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";


class ReservationCalendar extends React.Component {
    state = {};
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }

    render() {
        return (<>
            <Header />
            <Container className="mt--7">
                <Row>
                    <Calendar month="September" year="2022" />
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