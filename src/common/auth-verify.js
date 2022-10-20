import { logout, refresh } from "actions/auth";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


class AuthVerify extends React.Component {
    constructor(props) {
        super(props);
        props.history.listen(() => {
            if (props.user) {
                const now = new Date();
                console.log(Date.parse(props.user.tokens.refresh.expires));
                console.log(now.getTime());
                if (Date.parse(props.user.tokens.access.expires) < now.getTime()) {
                    if (Date.parse(props.user.tokens.refresh.expires) < now.getTime()) {
                        // If both tokens expired, need to re-authenticate user
                        props.dispatch(logout(props.user.tokens.refresh.token))
                        .then(() => {
                            props.history.push('/login');
                        });
                    } else {
                        // Fetch a new token
                        props.dispatch(refresh(props.user.tokens.refresh.token))
                        .then(() => {
                            props.history.go(0);
                        })
                    }
                    
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