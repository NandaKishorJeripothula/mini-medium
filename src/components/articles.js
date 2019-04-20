import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Button, Text, Container, Content, Footer, FooterTab } from 'native-base';
import { logout } from '../redux/actions'
import { withNavigation } from 'react-navigation';
import FooterTabNavigator from './footerTabNavigator';
import ArticleCard from './articleCard';
import { getArticles } from '../apis';
import ArticleData from './articleData';
class Articles extends Component {
    static navigationOptions = {
        title: 'Articles',
    };
    constructor(props) {
        super(props);
        this.state = {
            articleData: '',
        }
        this.handleLogoutPressed = this.handleLogoutPressed.bind(this);
        this.fetchArticles = this.fetchArticles.bind(this);

    }
    componentDidMount = () => {
        this.fetchArticles();
    }
    fetchArticles = async () => {
        //fetch and render the articles 
        var articleData = await getArticles(this.props.session.token);
        // console.log("From ArticlesPage\n", articleData);
        this.setState({ articleData: articleData });
    }


    handleLogoutPressed = async () => {
        this.props.dispatch(logout());
    }
    render() {
        let articles;
        if (this.state.articleData.length > 0) {
            console.log("from render", this.state.articleData[0].title);
            for (var i = 0; i < this.state.articleData.length; i++) {
                // articles += <ArticleCard id={this.state.articleData[i].id} key={i} artcile={this.state.articleData[i]} userArticle={false} />
                articles += <ArticleData title={this.state.articleData[i].title} content={this.state.articleData[i].content} />
            }
            // artciles = this.state.articleData.map((artcile, i) => (
            //     // console.log("article", artcile, "index", i);
            //     <ArticleCard id={artcile.id} key={i} artcile={artcile} userArticle={false} />
            // ))
            console.log("Aftrs after map", articles);
        }
        return (
            <Container>
                <Content>
                    <View>
                        {/* {articles} */}
                        <Text> Hey am artciles screen</Text>
                        <Text>Logout{articles}</Text>
                        <Button transparent onPress={() => { this.handleLogoutPressed }} >
                            <Text>Logout</Text>
                        </Button>
                    </View >

                </Content>

                <Footer>
                    <FooterTab>
                        <Button full onPress={() => { this.props.navigation.navigate('Articles') }} >
                            <Text>Articles</Text>
                        </Button>
                        <Button full onPress={() => { this.props.navigation.navigate('Profile') }}>
                            <Text>Profile</Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>

        )
    }
}
function mapStateToProps(state) {
    return {
        session: state.session,
    };
}
export default connect(mapStateToProps)(withNavigation(Articles));