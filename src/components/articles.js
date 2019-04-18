import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text } from 'react-native'

class Articles extends Component {
    render() {
        return (
            <Text> Hey am artciles screen</Text>
        )
    }
}

export default connect()(Articles);