export default {
    api: {
        root: "http://127.0.0.1:3001/v1",
        boat: {
            root: "/boats"
        },
        auth: {
            root: "/auth",
            register: "/auth/register",
            login: "/auth/login",
            logout: "/auth/logout",
            refreshTokens: "/auth/refresh-tokens",
            forgotPassword: "/auth/forgot-password",
            resetPassword: "/auth/reset-password",
            sendVerificationEmail: "/auth/send-verification-email",
            verifyEmail: "/auth/verifyEmail"
        },
        reservations: {
            root: "/reservations",
        }
    }
}