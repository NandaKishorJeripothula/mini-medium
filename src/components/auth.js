import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Auth extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>''''''''''''''''''''
                Am Auth screen
            </div>
        )
    }
}
export default connect(Auth);