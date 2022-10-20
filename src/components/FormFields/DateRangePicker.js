import React from "react";
import ReactDatetimeClass from "react-datetime";
import { Col,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from "reactstrap";

const DateRangePicker = (props) => {
    const getClassNameReactDatetimeDays = (date) => {
        if (
            props.startDate &&
            props.endDate &&
            props.startDate !== props.endDate
        ) {
            const startDate = new Date(props.startDate);
            const endDate = new Date(props.endDate);
            const currDate = new Date(date);
            
            if (
                endDate > currDate &&
                startDate < currDate
            ) {
                return " middle-date";
            }
            if (endDate.toString() === currDate.toString()) {
                return " end-date"
            }
            if (startDate.toString() === currDate.toString()) {
                return " start-date";
            }
        }
        return "";
    }

    return <Row>
        <Col xs={6}>
            <FormGroup>
                <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <ReactDatetimeClass
                        value={props.startDate ? new Date(props.startDate) : new Date()}
                        inputProps={{
                            placeholder: "Start Date",
                            className: props.isError ? "form-control is-invalid" : "form-control"
                        }}
                        timeFormat={false}
                        renderDay={(elProps, currentDate, selectedDate) => {
                            let classes = elProps.className;
                            classes += getClassNameReactDatetimeDays(currentDate);
                            return (
                                <td {...elProps} className={classes}>
                                {currentDate.date()}
                                </td>
                            );
                            }}
                        onChange={e => {props.setStartDate(e)}}
                    />
                </InputGroup>
            </FormGroup>
        </Col>
        <Col xs={6}>
            <FormGroup>
                <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <ReactDatetimeClass
                        value={props.endDate ? new Date(props.endDate) : new Date()}
                        inputProps={{
                            placeholder: "End Date",
                            className: props.isError ? "form-control is-invalid" : "form-control"
                        }}
                        timeFormat={false}
                        renderDay={(elProps, currentDate, selectedDate) => {
                            let classes = elProps.className;
                            classes += getClassNameReactDatetimeDays(currentDate);
                            return (
                                <td {...elProps} className={classes}>
                                {currentDate.date()}
                                </td>
                            );
                            }}
                        onChange={e => {props.setEndDate(e)}}
                    />
                </InputGroup>
            </FormGroup>
        </Col>
    </Row>
}

export default DateRangePicker;