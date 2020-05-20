import React from 'react';
import {View,Text,FlatList, ScrollView,TouchableOpacity,Image} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import AppStringsAs from '../constants/strings_as.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton,Button,Loader,Row,Col,Box,Line,IconCustom} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import GLOBAL from '../constants/global.js';
import LinearGradient from 'react-native-linear-gradient';
import { Thumbnail } from 'react-native-thumbnail-video';

class AdminHome extends React.Component {
  static navigationOptions = {
    header: null ,
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  render(){
    return (
      <Container>
        <Header
          androidStatusBarColor={Colors.theme1}
          style={[stylesC.header,{height:0}]}>
        </Header>
        <Content contentContainerStyle={[stylesC.mainWithLoader]}>
          <Col extraStyle={[stylesC.main]}>
            <LinearGradient 
              colors={[Colors.theme1, Colors.theme, Colors.background]} 
              style={{width:'100%',height:55,backgroundColor:Colors.white,paddingHorizontal:15, alignItems:'center',justifyContent:'center'}}>
              <Text style={[stylesC.textDB18,{marginLeft:10,color:'white'}]}>
                Home
              </Text>
            </LinearGradient>
            <BackButton
              onPress={()=>{
                this.props.navigation.goBack();
              }}/>
            <ScrollView>
                <Col extraStyle={[{padding:15}]}>
                    <Button
                        label='Categories'
                        activeOpacity={0.6}
                        buttonStyle={[stylesC.button45,{marginTop:0,marginHorizontal:0}]}
                        labelStyle={[stylesC.buttonT16]}
                        onPress={()=>{
                          this.props.navigation.navigate('AdminCats');
                        }}/>
                    <Button
                        label='About Us'
                        activeOpacity={0.6}
                        buttonStyle={[stylesC.button45,{marginTop:20,marginHorizontal:0}]}
                        labelStyle={[stylesC.buttonT16]}
                        onPress={()=>{
                          this.props.navigation.navigate('AdminAboutUs');
                        }}/>
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

  async componentDidMount(){
    console.log("AdminHome mount");
  }

  onFocus = async ()=>{
    
  };

}

export default AdminHome