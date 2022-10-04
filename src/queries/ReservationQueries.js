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
    console.log(body);
    let response = await fetch(`${process.env.REACT_APP_API_BASE}/reservations`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    return response;
}

export const getAllReservations = async (accessToken) => {
    return await fetch(`${process.env.REACT_APP_API_BASE}/reservations`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
}