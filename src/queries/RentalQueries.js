/**
 * Get boat data for each boat
 * @returns {Promise<Array<Object>>>} List of boat objects
 */
export const getAllBoats = async () => {
    let response = await fetch(`${process.env.REACT_APP_API_BASE}/boats`);
    return response.json();
}