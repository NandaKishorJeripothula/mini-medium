import React from 'react'

import { Button, Text, FooterTab } from 'native-base';
import { withNavigation } from 'react-navigation';
function FooterTabNavigator(props) {
    return (
        <FooterTab>
            <Button full onPress={() => { this.props.navigation.navigate('Articles') }} >
                <Text>Articles</Text>
            </Button>
            <Button full onPress={() => { this.props.navigation.navigate('Profile') }}>
                <Text>Profile</Text>
            </Button>
        </FooterTab>
    )
}
export default withNavigation(FooterTabNavigator);