import React from 'react';
import { withRouter } from 'react-router';
import * as Cookie from "js-cookie";


export default function requireAuth(Component) {

    class AuthenticatedComponent extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                auth: Cookie.get('auth_Era_Auto_Admin')
            }
        }

        componentDidMount() {
            this.checkAuth();
        }

        checkAuth() {

            if (!Cookie.get('auth_Era_Auto_Admin')) {
                this.props.history.push(`/login`);
            }
        }

        render() {
            return Cookie.get('auth_Era_Auto_Admin')
                ? <Component {...this.props} />
                : null;
        }
    }
    return withRouter(AuthenticatedComponent)
}