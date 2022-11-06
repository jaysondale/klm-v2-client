/** @jest-environment jsdom */
import AuthVerify from "common/auth-verify";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "utils/test-utils";

describe("AuthVerify Tests", () => {
    const referenceDate = new Date("07/08/2022");
    test("Given valid access and refresh tokens when rendering nothing happens", () => {
        const user = {
            tokens: {
                access: {
                    token: "test_token",
                    expires: referenceDate.toISOString()
                }
            }
        }
        renderWithProviders(
            <BrowserRouter>
                <AuthVerify
                    user={user}
                />
            </BrowserRouter>
        )
    })
})