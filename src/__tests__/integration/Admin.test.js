/** @jest-environment jsdom */

import { rest } from "msw";
import React from "react";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import Admin from "views/admin/Admin";
import { renderWithProviders } from "utils/test-utils";

const handlers = [
    // Add handlers
]

const server = setupServer(...handlers);

beforeAll(() => server.listen());

beforeEach(() => {
    localStorage.clear();
})

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

/**
test("Testing the test runner", () => {
    const reservationmanagerRoute = "/admin/reservation-manager"
    renderWithProviders(
        <MemoryRouter initialEntries={[reservationmanagerRoute]}>
            <Admin />
        </MemoryRouter>
    )
    expect(screen.getText())
});
 */