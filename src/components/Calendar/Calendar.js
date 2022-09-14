import { buildRows } from "./CalendarUtils";

const { useState } = require("react");
const { Card, CardHeader, Table, Button } = require("reactstrap")

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

/*
Parameter Structure:

*/
const Calendar = (props) => {
    const [month, setMonth] = useState(props.month);
    const [year, setYear] = useState(props.year);

    let rows = buildRows(month, year);

    for (let row of rows) {
        for (let cell of row) {
            if (cell) {
                
            }
        }
    }


    return (<>
        <Card className="shadow w-100">
            <CardHeader>
                <div className="d-flex">
                    <h3>{month} {year}</h3>
                    <Button className="ml-auto" secondary>Prev</Button>
                    <Button className="ml-1" secondary>Next</Button>
                </div>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        {weekdays.map(weekday => <th scope="col">{weekday}</th>)}
                    </tr>
                </thead>
            </Table>
        </Card>
    </>)
}

export default Calendar;