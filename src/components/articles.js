import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Button, Text } from 'native-base';
import logout from '../redux/actions'

class Articles extends Component {
    constructor(props) {
        super(props);
    }

    handleLogoutPressed() {
        this.props.dispatch({ type: 'RESET_STATE' })
    }
    render() {
        return (
            <View>
                <Text> Hey am artciles screen</Text>
                <Button transparent onPress={() => { this.handleLogoutPressed() }} >
                    <Text>Logout</Text>
                </Button>

            </View >
        )
    }
}
export default connect()(Articles);