import React from 'react';
import {Text,ScrollView} from 'react-native';
import {Container,Content} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton,Button,Col,Loader} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {Input} from 'react-native-elements';
import * as Collections from '../constants/firebase';
import firestore from '@react-native-firebase/firestore';

class AdminAboutUs extends React.Component {
  static navigationOptions = {
    header: null ,
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  state = {
    loading:false,
    about_en: '',
    about_as: ''
  };

  render(){
    return (
      <Container>
        <Content contentContainerStyle={[stylesC.mainWithLoader]}>
          <Col extraStyle={[stylesC.main]}>
            <LinearGradient 
              colors={[Colors.theme1, Colors.theme, Colors.background]} 
              style={{width:'100%',height:55,backgroundColor:Colors.white,paddingHorizontal:15, alignItems:'center',justifyContent:'center'}}>
              <Text style={[stylesC.textDB18,{marginLeft:10,color:'white'}]}>
                About Us
              </Text>
            </LinearGradient>
            <BackButton
              onPress={()=>{
                this.props.navigation.goBack();
              }}/>
            <ScrollView>
              <Col extraStyle={[{padding:15}]}>
                <Text style={[stylesC.textDB16,{alignSelf:'center'}]}>
                  About Us (English)
                </Text>
                <Input
                  multiline={true}
                  placeholder='About Us (English)'
                  inputStyle={[stylesC.field,{textAlign:'left'}]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({about_en:text})}
                  value={this.state.about_en}
                  blurOnSubmit={false}/>
                <Text style={[stylesC.textDB16,{alignSelf:'center'}]}>
                  About Us (Assamese)
                </Text>
                <Input
                  multiline={true}
                  placeholder='About Us (Assamese)'
                  inputStyle={[stylesC.field,{textAlign:'left'}]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({about_as:text})}
                  value={this.state.about_as}/>
                <Button
                  label='Save Changes'
                  activeOpacity={0.6}
                  buttonStyle={[stylesC.button45,{marginTop:15,marginHorizontal:10}]}
                  labelStyle={[stylesC.buttonT16]}
                  onPress={()=>{
                    this.saveData();
                  }}/>
              </Col>
            </ScrollView>
          </Col>
          <Loader
              containerStyle={[stylesC.loader]}
              animating={this.state.loading}/>
          <NavigationEvents
            onDidFocus={() => {
              this.onFocus();
            }}/>
        </Content>
      </Container>
    );
  }

  saveData = ()=>{
    if(this.state.about_en === ''){
      return;
    }
    this.setState({loading:true});
    firestore()
      .collection(Collections.about_us)
      .doc(Collections.about_us)
      .set({
        'text_en': this.state.about_en,
        'text_as': this.state.about_as,
        'photo': 'about_us.png'
      })
      .then((ref) => { 
        console.log('ref:'+ref);
        this.props.navigation.goBack();
      });
  };

  async componentDidMount(){
    this.loadData();
  }

  loadData = async ()=>{
    this.setState({loading:true}); 
    const about_us = await firestore()
      .collection(Collections.about_us)
      .doc(Collections.about_us)
      .get();
      
    this.setState({
      loading:false,
      about_en: about_us.data().text_en,
      about_as: about_us.data().text_as 
    });
  };

  onFocus = async ()=>{
    
  };

}

export default AdminAboutUs