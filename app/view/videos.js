import React from 'react';
import {View,Text,FlatList, ScrollView,TouchableOpacity,Image} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import AppStringsAs from '../constants/strings_as.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton,IconButton,Loader,Row,Col,Box,Line,IconCustom} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import GLOBAL from '../constants/global.js';
import LinearGradient from 'react-native-linear-gradient';
import { Thumbnail } from 'react-native-thumbnail-video';

class Videos extends React.Component {
  static navigationOptions = {
    header: null ,
  };

  constructor(props){
    super(props);
    if(GLOBAL.lang === 'en'){
      Strings = AppStrings.getInstance();
    }
    else{
      Strings = AppStringsAs.getInstance();
    }
  }

  state = {
    title:'',
    models:[],
  };

  render(){
    return (
      <Container>
        <Content contentContainerStyle={[stylesC.mainWithLoader]}>
          <Col extraStyle={[stylesC.main]}>
            <LinearGradient 
              colors={[Colors.theme1, Colors.theme, Colors.background]} 
              style={{width:'100%',height:55,backgroundColor:Colors.white, alignItems:'center',justifyContent:'center'}}>
              <Row extraStyle={[{width:'100%',height:55,paddingHorizontal:15}]}>
                <Text style={[stylesC.textDB18,{flex:1,color:'white',textAlign:'center'}]}>
                  {this.state.title}
                </Text>
              </Row>
            </LinearGradient>
            <BackButton
              onPress={()=>{
                this.props.navigation.goBack();
              }}/>
            <ScrollView>
            <Col extraStyle={[{padding:15}]}>
              <View style={{width:'100%'}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  horizontal={false}
                  data={this.state.models}
                  ListEmptyComponent={
                    this.getEmptyPanel()
                  }
                  extraData={this.state} // refresh list on state change
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this._renderItem}/>
              </View>
            </Col>
            </ScrollView>
          </Col>
          <NavigationEvents
            onDidFocus={payload => {
              this.onFocus();
            }}/>
        </Content>
      </Container>
    );
  }

  getEmptyPanel = ()=>{
    if(this.state.loading){
      return null;
    }
    return (
      <Col center extraStyle={{flex:1}}>
        <Text style={[stylesC.textD16,{width:'100%',marginTop:10,textAlign:'center'}]}>
          {Strings.cs}
        </Text>
      </Col>
    );
  };

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{flex:1}}
        activeOpacity={0.6}
        onPress={()=>{
          this.props.navigation.navigate('VideoPlay',{title:item.title, desc:item.desc, link:item.link, from:'Videos'});
        }}>
        <Card
          noShadow
          style={{height:120,marginBottom:10,flex:1,padding:15,alignItems:'center',justifyContent:'center'}}>
          <Row center>
            <Col middleLeft extraStyle={{flex:2,marginLeft:0}}>
              <Box center extraStyle={[{backgroundColor:Colors.lightGray}]}>
                <Thumbnail 
                    showPlayIcon={false}
                    url={item.link}
                    imageWidth={100}
                    imageHeight={70}/>
              </Box>
            </Col>
            <Col middleLeft extraStyle={{flex:3,marginLeft:20}}>
              <Text style={stylesC.textM16}>
                {item.title.length>50? item.title.substring(0,50)+'...' : item.title}
              </Text>
            </Col>
            <Col center extraStyle={{flex:1}}>
              <IconCustom
                conatinerStyle={[stylesC.center]}
                imageStyle={[stylesC.imageM28,{tintColor:Colors.red}]}
                resizeMode='contain'
                source={require('../assets/play.png')}/>
            </Col>
          </Row>
        </Card>
      </TouchableOpacity>
    );
  };

  async componentDidMount(){
    console.log("Videos mount");
    let title = this.props.navigation.getParam('title');
    let models = this.props.navigation.getParam('models');
    this.setState({title:title, models:models});
  }

  onFocus = async ()=>{
    
  };

}

export default Videos