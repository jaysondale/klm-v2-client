import { logout } from "actions/auth";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


class AuthVerify extends React.Component {
    constructor(props) {
        super(props);
        props.history.listen(() => {
            if (props.user) {
                if (Date.parse(props.user.tokens.access.expires) < Date.now()) {
                    props.dispatch(logout(props.user.tokens.refresh.token))
                    .then(() => {
                        props.history.push('/login');
                    });
                }
            }
        })
    }

    render() {
        return <></>
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return { user };
}
export default connect(mapStateToProps)(withRouter(AuthVerify));