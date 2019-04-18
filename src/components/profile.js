import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text } from 'react-native'

class Profile extends Component {
    render() {
        return (
            <Text> Hey am artciles screen</Text>
        )
    }
}

export default connect()(Profile);