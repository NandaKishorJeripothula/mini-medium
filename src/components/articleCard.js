import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import PropTypes from 'prop-types'
var image = require('../../assets/icon.png');
import { apiUrl } from '../config';
// ArticleCard.propTypes = {
//     likes: PropTypes.string.isRequired,
//     conten: PropTypes.string,
//     title: PropTypes.string.isRequired,
//     userArticle: PropTypes.bool.isRequired


// }
class ArticleCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,

            ...this.props.article
        };
        this.handleLikesButton = this.handleLikesButton.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleBookmarkButton = this.handleBookmarkButton.bind(this);
    }
    handleEditButton = async () => {

    }
    handleDeleteButton = async () => { }
    handleLikesButton = async () => {
        var requestOptions = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.props.session.token
            },
            "body": {
                "hasura_id": this.props.session.hasura_id,
                "id": this.state.id
            }
        };
        var newLikes = await fetch(apiUrl, requestOptions)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then((data) => {
                return data.count;
            });
        this.setState({ likes: newLikes });
    }
    handleBookmarkButton = async () => {
        var requestOptions = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.props.session.auth_token
            },
            "body": {
                "hasura_id": this.props.session.userId,
                "id": this.state.id
            }
        };
        var newList = await fetch(apiUrl, requestOptions)
            .then((res) => {
                if (res.statusCode === 200) {
                    return res.json();
                } else {
                    return null;
                }
            })
            .then((data) => {
                return data.currentlist;
            })
        if (newList !== null) {
            this.props.dispatch({ type: 'UPDATE_BOOKMARK', bookmarks: newList })
        }
    }
    render() {
        // console.log("ArticleCard Props\n", this.props.article);
        console.log("ArticleCard States\n", this.state);
        if (this.props.userArticle === true) {
            return (
                //onPress={() => this.props.navigation.navigate('ReadArticle', { ...this.state })}
                <Card>
                    <CardItem cardBody>
                        <Image source={image} style={{ height: 100, width: null, flex: 1 }} />
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>{this.state.title}</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent onPress={() => this.handleLikesButton()}>
                                <Icon style={{ fontSize: 35 }} active name="thumbs-up" />
                                <Text>{this.state.likes}</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Button transparent onPress={() => this.handleDeleteButton()}>
                                <Icon style={{ fontSize: 35 }} active name="trash" />
                            </Button>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.handleEditButton()}>
                                <Icon style={{ fontSize: 35 }} active name="create" />
                            </Button>
                        </Right>
                    </CardItem>
                </Card>


            )
        }
        else {
            return (
                <Card>
                    <CardItem cardBody>
                        <Image source={image} style={{ height: 100, width: null, flex: 1 }} />
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>{this.state.title}</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent onPress={() => this.handleLikesButton()}>
                                <Icon style={{ fontSize: 35 }} active name="thumbs-up" />
                                <Text>{this.state.likes}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent onPress={() => this.handleBookmarkButton()}>
                                <Icon style={{ fontSize: 35 }} active name="bookmark" />
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            )
        }

    }

}
mapSessoionToProp = (state) => {
    return {
        session: state.session,
    };
}
export default connect(mapSessoionToProp)(ArticleCard);