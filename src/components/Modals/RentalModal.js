import { createReservation } from "queries/ReservationQueries";
import React from "react";
import ReactDatetimeClass from "react-datetime";
import { validate } from "email-validator";
import { isValidPhoneNumber } from "libphonenumber-js";
import {
    Button,
    ButtonGroup,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    Table,
    UncontrolledCarousel,
} from "reactstrap";
import DateRangePicker from "components/FormFields/DateRangePicker";


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
        console.log(this.state.startDate <= this.state.endDate);
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
                switch (response.status) {
                    case 200:
                        alert("Reservation created successfully");
                        break;
                    case 401:
                        // Handle token refresh
                        break;
                    default:
                        alert("There was an error creating your reservation.");
                }
            });
        }
    }

    renderPrices(prices) {
        return <Table>
            <thead className="thead-light">
                <tr>
                    <th>Period</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(prices).map((key) => {
                    return <tr>
                        <th>{key}</th>
                        <td>{prices[key]}</td>
                    </tr>
                })}
            </tbody>
        </Table>
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
                    <UncontrolledCarousel
                        interval={false}
                        items={boatImages}
                        className="mb-4"
                    />
                    {this.props.boat ? this.renderPrices(this.props.boat.price) : ""}
                    <h5 className="text-center">Make Reservation</h5>
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
                    <DateRangePicker
                        startDate={this.state.startDate}
                        setStartDate={(startDate) => {this.setState({startDate})}}
                        endDate={this.state.endDate}
                        setEndDate={(endDate) => {console.log(endDate); this.setState({endDate})}}
                        isError={this.state.formErrors.dates}
                    />
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