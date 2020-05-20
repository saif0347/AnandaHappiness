import React from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton,Loader,Row,Col,Box,Button,IconCustomButton,Line,IconCustom,showToast,showSuccessToast} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
//import {TextField} from 'react-native-material-textfield';
import Utils from '../util/utils.js';
import {Input} from 'react-native-elements';
import * as Collections from '../constants/firebase';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

class AdminLogin extends React.Component {
  static navigationOptions = {
    header:null
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  state = {
    loading:false,
    email:'',
    password:'',
    emailError:null,
    passwordError:null
  };

  render(){
    return (
      <Container>
        <Header
          androidStatusBarColor={Colors.theme1}
          style={[stylesC.header,{height:0}]}>
        </Header>
        <Content contentContainerStyle={[stylesC.mainWithLoader]}>
          <LinearGradient 
            colors={[Colors.theme1, Colors.theme, Colors.background]} 
            style={{width:'100%',height:55,backgroundColor:Colors.white, alignItems:'center',justifyContent:'center'}}>
            <Row extraStyle={[{width:'100%',height:55,paddingHorizontal:15}]}>
              <Text style={[stylesC.textDB18,{flex:1,color:'white',textAlign:'center'}]}>
                Admin Login
              </Text>
            </Row>
          </LinearGradient>
          <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:'center'}}>
            <Col center extraStyle={[{paddingHorizontal:30, paddingTop:30, paddingBottom:20}]}>
              <Row extraStyle={[{marginTop:30}]}>
                <Input
                  autoCapitalize='none'
                  ref={(input)=>this.email=input}
                  placeholder='Email'
                  inputContainerStyle={[stylesC.fieldP,{marginTop:0,marginHorizontal:0}]}
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='email-address' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({email:text})}
                  value={this.state.email}
                  onSubmitEditing={this.onSubmitEmail}
                  blurOnSubmit={false}/>
              </Row>
              <Row extraStyle={{marginTop:0}}>
                <Input
                  autoCapitalize='none'
                  secureTextEntry
                  value={this.state.password}
                  lineWidth={1}
                  inputContainerStyle={[stylesC.fieldP,{marginTop:-10,marginHorizontal:0}]}
                  inputStyle={[stylesC.field]}
                  ref={(input)=>this.password=input}
                  placeholder='Password'
                  keyboardType='default'
                  onChangeText={(text)=>this.setState({password:text})}/>
              </Row>
              <Button
                label='Login'
                activeOpacity={0.6}
                buttonStyle={[stylesC.buttonR45,{height:50,marginTop:20,marginHorizontal:10}]}
                labelStyle={[stylesC.buttonT16]}
                onPress={this.loginUser}/>
            </Col>
          </ScrollView>
          <Loader
            containerStyle={[stylesC.loader]}
            animating={this.state.loading}/>
          <NavigationEvents
            onDidFocus={payload => {
              // onFocus
            }}/>
        </Content>
      </Container>
    );
  }

  loginUser = async ()=>{
    if(this.state.email === ''){
      showToast('Email required');
      return;
    }
    if(this.state.password === ''){
      showToast('Password required');
      return;
    }

    this.setState({loading:true});
    const admin = await firestore()
      .collection(Collections.admin)
      .doc(Collections.admin)
      .get();

    if(admin.data().email === this.state.email){
      if(admin.data().password === this.state.password){
        this.setState({loading:false});
        // move to home
        Utils.moveToAnotherStack(this.props.navigation, 'Admin');
        return;
      } 
    }
    showToast('Login failed');
    this.setState({loading:false});
  };

  onSubmitEmail = ()=>{
    this.password.focus();
  };

  async componentDidMount(){
    console.log("AdminLogin mount");
  }

  onFocus = ()=>{
    console.log("AdminLogin focus");
  };

  componentWillUnmount(){
    console.log("AdminLogin unmount");
  }
}

export default AdminLogin