import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text } from 'react-native'

class Profile extends Component {
    render() {
        return (
            <Text> Hey am Profile screen,, add logout button</Text>
        )
    }
}

export default connect()(Profile);