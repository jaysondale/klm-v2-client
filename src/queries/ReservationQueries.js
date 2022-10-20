import config from "../config";

export const createReservation = async (name, email, phone, startDate, endDate, boatId, destination) => {
    const body = {
        requestName: name,
        requestEmail: email,
        requestPhone: phone,
        boatId: boatId,
        startDay: startDate.toString(),
        endDay: endDate.toString(),
        destination: destination
    };
    let response = await fetch(`${process.env.REACT_APP_API_BASE}${config.api.reservations.root}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return response;
}

export const getAllReservations = async (accessToken) => {
    return await fetch(`${process.env.REACT_APP_API_BASE}${config.api.reservations.root}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
}

export const getPendingReservations = async (accessToken) => {
    const response = await getAllReservations(accessToken);
    if (response.status == 200) {
        const reservations = await response.json();
        return reservations.filter((val) => {
            return !val.isConfirmed;
        });
    }
    return {};
}