import DateRangePicker from "components/FormFields/DateRangePicker";
import { getAllBoats } from "queries/RentalQueries";
import React from "react";
import { Button,
    ButtonGroup,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    UncontrolledDropdown
} from "reactstrap";

class PendingRequestModal extends React.Component {
    state = {
        radioSelected: 0,
        boatList: [],
        formErrors: {
            name: false,
            email: false,
            phone: false,
            dates: false
        }
    }

    constructor(props) {
        super(props);
        this.handleBoatChange = this.handleBoatChange.bind(this);
    }

    componentDidMount() {
        getAllBoats().then(boatList => {
            this.setState({boatList});
        });
    }

    setRadioButton(idx) {
        this.setState({
            radioSelected: idx
        });
        this.props.setReservation({
            destination: (idx == 0 ? "Kennisis" : "Redstone")
        });
    }

    handleBoatChange(e) {
        const boatId = e.target.value;
        const boatName = this.state.boatList.find((boat) => {
            return boat._id == boatId
        }).name;
        this.props.setReservation({
            boatId,
            boatName
        });
    }

    render() {
        return <Modal
            isOpen={this.props.isOpen}
            toggle={this.props.toggleModal}
            className="modal-dialog-centered"
        >
            <div className="modal-header bg-secondary">
                <h5>View Reservation Request</h5>
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={this.props.toggleModal}
                    ><span aria-hidden={true}>×</span></button>
            </div>
            <ModalBody>
                <FormGroup className={(this.state.formErrors.name ? "has-danger" : "")}>
                    <Input
                        className={(this.state.formErrors.name ? "is-invalid" : "")}
                        onChange={e => {this.props.setReservation({
                            name: e.target.value
                        })}}
                        value={this.props.reservation ? this.props.reservation.requestName : ""}
                        type="text"
                    />
                </FormGroup>
                <FormGroup className={(this.state.formErrors.email ? "has-danger" : "")}>
                    <Input
                        className={(this.state.formErrors.email ? "is-invalid" : "")}
                        onChange={e => {this.props.setReservation({
                            email: e.target.value
                        })}}
                        value={this.props.reservation ? this.props.reservation.requestEmail : ""}
                        type="text"
                    />
                </FormGroup>
                <FormGroup className={(this.state.formErrors.phone ? "has-danger" : "")}>
                    <Input
                        className={(this.state.formErrors.phone ? "is-invalid" : "")}
                        onChange={e => {this.props.setReservation({
                            phone: e.target.value
                        })}}
                        value={this.props.reservation ? this.props.reservation.requestPhone : ""}
                        type="text"
                    />
                </FormGroup>
                <FormGroup>
                    <UncontrolledDropdown>
                        <DropdownToggle caret>
                            {this.props.reservation ? this.props.reservation.boatName : ""}
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.state.boatList.map((boat, idx) => {
                                return <DropdownItem onClick={this.handleBoatChange} value={boat._id} key={idx}>{boat.name}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </FormGroup>
                <FormGroup>
                    <span className="mr-3">Destination</span>
                    <ButtonGroup>
                        <Button onClick={() => {this.setRadioButton(0)}} active={this.state.radioSelected === 0} color="secondary">Kennisis</Button>
                        <Button onClick={() => {this.setRadioButton(1)}} active={this.state.radioSelected === 1} color="secondary">Redstone</Button>
                    </ButtonGroup>
                </FormGroup>
                <FormGroup className={(this.state.formErrors.price ? "has-danger" : "")}>
                    <InputGroup>
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fa fa-dollar"></i></span>
                        </div>
                        <Input
                            className={(this.state.formErrors.price ? "is-invalid" : "")}
                            onChange={e => {this.setState({
                                price: e.target.value
                            })}}
                            placeholder="Price"
                            type="text"
                        />
                    </InputGroup>
                </FormGroup>
                <DateRangePicker
                    startDate={(this.props.reservation ? new Date(this.props.reservation.startDay) : null)}
                    setStartDate={startDate => {this.props.setReservation({startDate})}}
                    endDate={(this.props.reservation ? new Date(this.props.reservation.endDay) : null)}
                    setEndDate={endDate => {this.props.setReservation({endDate})}}
                    isError={this.state.formErrors.dates}
                />
            </ModalBody>
        </Modal>
    }
}

export default PendingRequestModal;