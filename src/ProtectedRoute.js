import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

class ProtectedRoute extends React.Component {
    render() {
        const { component: Component, ...props} = this.props;
        return <Route
            {...props}
            render={props => {
                return this.props.isLoggedIn ?
                <Component {...props} /> :
                <Redirect to="/login" />
            }}
        />
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
}
export default connect(mapStateToProps)(ProtectedRoute);