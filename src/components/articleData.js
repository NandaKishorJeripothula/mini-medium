import React from 'react'

export default function ArticleData(Props) {
    return (
        <Container>
            <Content>
                <CardItem>
                    <Body>
                        <Text>{this.props.title}</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>{this.props.content}</Text>
                    </Body>
                </CardItem>
            </Content>
        </Container>
    )
}
