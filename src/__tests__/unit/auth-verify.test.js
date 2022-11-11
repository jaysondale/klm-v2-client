/** @jest-environment jsdom */
import { getByTestId, queryAllByText, queryByTestId } from "@testing-library/dom";
import AuthVerify from "common/auth-verify";
import { Router } from "react-router-dom";
import { renderWithProviders } from "utils/test-utils";

const referenceDate = new Date("07/08/2022");

const mockHistoryListen = jest.fn();

const mockHistory = {
    push: jest.fn(),
    location: {},
    listen: mockHistoryListen
}

beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(referenceDate);
});

afterAll(() => {
    jest.useRealTimers();
})

describe("AuthVerify Tests", () => {
    test("Given valid access and refresh tokens when rendering nothing happens", () => {
        
    })
})