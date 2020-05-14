import React from 'react';
import {Text,ScrollView} from 'react-native';
import {Container,Content,Header} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import AppStringsAs from '../constants/strings_as.js';
import {stylesC} from '../styles/style_common.js';
import {Loader,Col} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import GLOBAL from '../constants/global.js';
import LinearGradient from 'react-native-linear-gradient';
import * as Collections from '../constants/firebase';
import firestore from '@react-native-firebase/firestore';
import AsyncImage from '../view/async_image.js';

class AboutUs extends React.Component {
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
    loading:false,
    photo:'about_us.png',
    text:''
  };

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
                {Strings.about_us}
              </Text>
            </LinearGradient>
            <ScrollView>
            <Col extraStyle={[{padding:15}]}>

              <AsyncImage
                image={this.state.photo}
                style={{width:350,height:250,alignSelf:'center'}}/>

              <Text style={[stylesC.textD14,{marginTop:10}]}>
                {this.state.text}
              </Text>

            </Col>
            </ScrollView>
          </Col>
          <Loader
              containerStyle={[stylesC.loader]}
              animating={this.state.loading}/>
          <NavigationEvents
            onDidFocus={() => {
              
            }}/>
        </Content>
      </Container>
    );
  }

  async componentDidMount(){
    console.log("AboutUs mount");
    this.setState({loading:true}); 
    const about_us = await firestore()
      .collection(Collections.about_us)
      .doc(Collections.about_us)
      .get();
      
    let text;
    if(GLOBAL.lang==='en'){
      text = about_us.data().text_en;
    }
    else{
      if(about_us.data().text_as === ''){
        text = about_us.data().text_en;
      }
      else{
        text = about_us.data().text_as;
      }
    }

    this.setState({
      loading:false,
      photo: about_us.data().photo, 
      text: text,
    });
  }

}

export default AboutUs