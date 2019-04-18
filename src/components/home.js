import React, { Component } from 'react';
import { AsyncStorage, AlertStyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Auth from './auth';
import Articles from './articles';
class Home extends Component {

  /**
   * After loading the component check whether any session is present 
   * if not redirect to authScreen
   */

  async componentDidMount() {
    try {
      var sessionJson = await AsyncStorage.getItem("@minimedium:session")
      var session = await JSON.parse(sessionJson)
      if (session !== null) {
        console.log("Found Session")
        console.log(session);
        this.props.dispatch({ type: 'SET_SESSION', session })
      }
    }
    catch (err) {
      this.props.dispatch({ type: 'RESET_STATE' })
      console.log('Session not found');
      console.error(err);
    }
  }

  render() {
    // console.log(JSON.stringify(this.props))
    /**
     * If the length of the session is zero
     * that is, if no session is there then length is zero
     * call authScreen
     */
    if (Object.keys(this.props.session).length === 0) {
      return (<Auth />)
    }
    else {
      return (<Articles />)
    }
  }

}

Home.propTypes = {
  session: PropTypes.object.isRequired,
}
function mapStateToProps(state) {
  return {
    /**
     * This state object is taken from the store 
     * session curresponds to the session attribute in initial state
     */
    session: state.session,
  };
}

/**
 * Exporting the Home Component and connecting it to the store 
 * Bind the incoming data (session) to the state object of the home component
 */
export default connect(mapStateToProps)(Home);
