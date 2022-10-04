import { createReservation } from "queries/ReservationQueries";
import React from "react";
import ReactDatetimeClass from "react-datetime";
import { validate } from "email-validator";
import { isValidPhoneNumber } from "libphonenumber-js";
import {
    Badge,
    Button,
    ButtonGroup,
    Col,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalBody,
    Row,
    UncontrolledCarousel,
} from "reactstrap";


class RentalModal extends React.Component {
    state = {
        startDate: null,
        endDate: null,
        radioSelected: 0,
        name: "",
        email: "",
        phone: "",
        formErrors: {
            name: false,
            email: false,
            phone: false,
            dates: false
        }
    }

    constructor(props) {
        super(props);
        this.setRadioButton = this.setRadioButton.bind(this);
        this.makeReservation = this.makeReservation.bind(this);
        this.validateDates = this.validateDates.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    componentDidMount() {
        this.setState({
            formErrors: {
                name: false,
                email: false,
                phone: false,
                dates: false
            }
        })
    }

    setRadioButton(i) {
        this.setState({radioSelected: i})
    }

    validateDates() {
        if (this.state.startDate && this.state.endDate) {
            return this.state.startDate <= this.state.endDate;
        }
        return false;
    }

    validateForm() {
        const formErrors = {
            name: this.state.name == "",
            email: !validate(this.state.email),
            phone: !isValidPhoneNumber(this.state.phone, "CA"),
            dates: !this.validateDates()
        }
        this.setState({formErrors: formErrors})
        return !(formErrors.email || formErrors.phone || formErrors.dates);
    }

    makeReservation() {
        if (this.validateForm()) {
            createReservation(
                this.state.name,
                this.state.email,
                this.state.phone,
                this.state.startDate,
                this.state.endDate,
                this.props.boat._id,
                this.state.radioSelected == 0 ? "Kennisis" : "Redstone"
            ).then(response => {
                if (response.status == 200) {
                    // Handle success
                }
            });
        }
    }

    render() {
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
        ];

        return <>
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.props.toggleModal}
                className="modal-dialog-centered"
            >
                <div className="modal-header bg-secondary">
                    <h5>{this.props.boat ? this.props.boat.name : ""}</h5>
                    <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={this.props.toggleModal}
                    ><span aria-hidden={true}>×</span></button>
                </div>
                <ModalBody>
                    <p>Selected index {this.props.boat ? this.props.boat.length : ""}</p>
                    <UncontrolledCarousel
                        interval={false}
                        items={boatImages}
                        className="mb-4"
                    />
                    <FormGroup className={(this.state.formErrors.name ? "has-danger" : "")}>
                        <Input className={(this.state.formErrors.name ? "is-invalid" : "")}
                            onChange={e => {this.setState({name: e.target.value})}}
                            placeholder="Name"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup className={(this.state.formErrors.email ? "has-danger" : "")}>
                        <Input className={(this.state.formErrors.email ? "is-invalid" : "")}
                            onChange={e => {this.setState({email: e.target.value})}}
                            placeholder="Email"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup className={(this.state.formErrors.phone ? "has-danger" : "")}>
                        <Input className={(this.state.formErrors.phone ? "is-invalid" : "")}
                            onChange={e => {this.setState({phone: e.target.value})}}
                            placeholder="Phone"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <span className="mr-3">Destination</span>
                        <ButtonGroup>
                            <Button onClick={() => {this.setRadioButton(0)}} active={this.state.radioSelected === 0} color="secondary">Kennisis</Button>
                            <Button onClick={() => {this.setRadioButton(1)}} active={this.state.radioSelected === 1} color="secondary">Redstone</Button>
                        </ButtonGroup>
                    </FormGroup>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <InputGroup className="input-group-alternative is-invalid">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-calendar-grid-58" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <ReactDatetimeClass
                                        inputProps={{
                                            placeholder: "Start Date",
                                            className: this.state.formErrors.email ? "form-control is-invalid" : "form-control"
                                        }}
                                        timeFormat={false}
                                        renderDay={(props, currentDate, selectedDate) => {
                                            let classes = props.className;
                                            if (
                                                this.state.startDate &&
                                                this.state.endDate &&
                                                this.state.startDate._d + "" === currentDate._d + ""
                                            ) {
                                                classes += " start-date";
                                            } else if (
                                                this.state.startDate &&
                                                this.state.endDate &&
                                                new Date(this.state.startDate._d + "") <
                                                new Date(currentDate._d + "") &&
                                                new Date(this.state.endDate._d + "") >
                                                new Date(currentDate._d + "")
                                            ) {
                                                classes += " middle-date";
                                            } else if (
                                                this.state.endDate &&
                                                this.state.endDate._d + "" === currentDate._d + ""
                                            ) {
                                                classes += " end-date";
                                            }
                                            return (
                                                <td {...props} className={classes}>
                                                {currentDate.date()}
                                                </td>
                                            );
                                            }}
                                        onChange={e => {this.setState({startDate: e})}}
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
                                        inputProps={{
                                            placeholder: "End Date"
                                        }}
                                        timeFormat={false}
                                        renderDay={(props, currentDate, selectedDate) => {
                                            let classes = props.className;
                                            if (
                                                this.state.startDate &&
                                                this.state.endDate &&
                                                this.state.startDate._d + "" === currentDate._d + ""
                                            ) {
                                                classes += " start-date";
                                            } else if (
                                                this.state.startDate &&
                                                this.state.endDate &&
                                                new Date(this.state.startDate._d + "") <
                                                new Date(currentDate._d + "") &&
                                                new Date(this.state.endDate._d + "") >
                                                new Date(currentDate._d + "")
                                            ) {
                                                classes += " middle-date";
                                            } else if (
                                                this.state.endDate &&
                                                this.state.endDate._d + "" === currentDate._d + ""
                                            ) {
                                                classes += " end-date";
                                            }
                                            return (
                                                <td {...props} className={classes}>
                                                {currentDate.date()}
                                                </td>
                                            );
                                            }}
                                        onChange={e => {this.setState({endDate: e})}}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <div className="modal-footer">
                    <Button onClick={this.makeReservation} color="primary">Reserve</Button>
                    <Button onClick={this.props.toggleModal} className="ml-auto" color="secondary">Close</Button>
                </div>
            </Modal>
        </>
    }
}

export default RentalModal;