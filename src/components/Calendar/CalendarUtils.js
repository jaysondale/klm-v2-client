/**
 * Build 2D array containing objects corresponding to each date box on the calendar
 * @param {String} month String representaion of month
 * @param {*} year String representation of year
 * @returns {Array<Array<Object>>}
 */
export const buildRows = (month, year) => {
    const currDate = new Date(`${month} 1, ${year}`);
    const monthNum = currDate.getMonth();
    let rows = [];
    for (let row = 0; row < 5; row++) {
        let row = new Array(7);
        for (let col = 0; col < 7; col++) {
            if (currDate.getDate() == 1) {
                if (currDate.getDay() == col) {
                    row[col] = {
                        date: new Date(currDate),
                        reservations: []
                    }
                    currDate.setDate(currDate.getDate() + 1);
                }
            } else {
                if (currDate.getMonth() != monthNum) {
                    row[col] = {
                        date: new Date(currDate),
                        reservations: []
                    }
                    currDate.setDate(currDate.getDate() + 1);
                } else {
                    break;
                }
            }
        }
        rows.push(row);
    }
    return rows;
}

export const insertReservations = (rows, reservations) => {
    for (let reservation in reservations) {
        const col = reservation.startDate.getDay();
        const date = reservation.startDate.getDate();
        for (let row of rows) {
            if (row[col]) {
                if (row[col].date.getDate() == date) {
                    // row[col].reservation // To be continued
                }
            }
        }
    }
}