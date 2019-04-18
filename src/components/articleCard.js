import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import React from 'react'
import PropTypes from 'prop-types'
export default function ArticleCard(props) {
    if (props.userArticle) {
        return (
            <Container>
                <Header />
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <Image source={{ uri: props.articleImageId }} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: 'Image URL' }} />
                                <Body>
                                    <Text>{props.title}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>{props.likes}</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Button transparent>
                                    <Icon active name="bin" />
                                </Button>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Icon active name="pen" />
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>

        )
    }
    else {
        return (
            <Container>
                <Header />
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <Image source={{ uri: props.articleImageId }} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: 'Image URL' }} />
                                <Body>
                                    <Text>{props.title}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>{props.likes}</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Button transparent>
                                    <Icon active name="chatbubbles" />
                                    <Icon active name="bookmark" />
                                </Button>
                            </Body>
                            <Right>
                                <Body>
                                    <Text>{props.authorName}</Text>
                                </Body>
                                <Thumbnail source={{ uri: props.imageID }} />

                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>

        )
    }

}
Home.propTypes = {
    likes: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    imageID: PropTypes.string,
    articleImageId: PropTypes.string,
    title: PropTypes.string.isRequired,
    userArticle: PropTypes.bool.isRequired


}