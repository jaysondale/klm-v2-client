import { rest } from "msw";
import { setupServer } from "msw/node";

const handlers = [
    // Add handlers
]

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("Testing the test runner", () => {
    expect(true).toBeTruthy();
});