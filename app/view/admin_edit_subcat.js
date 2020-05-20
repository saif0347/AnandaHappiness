import React from 'react';
import {View,Text,Alert, ScrollView,TouchableOpacity,Image} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import AppStringsAs from '../constants/strings_as.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton,Button,Loader,Row,Col,Box,Line,showToast,showSuccessToast} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import GLOBAL from '../constants/global.js';
import LinearGradient from 'react-native-linear-gradient';
import {Input} from 'react-native-elements';
import * as Collections from '../constants/firebase';
import firestore from '@react-native-firebase/firestore';

class AdminEditSubCat extends React.Component {
  static navigationOptions = {
    header: null ,
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  state = {
    loading:false,
    catId:'',
    id:'',
    name_en:'',
    name_as:''
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
                Edit Subcategory
              </Text>
            </LinearGradient>
            <BackButton
              onPress={()=>{
                this.props.navigation.goBack();
              }}/>
            <ScrollView>
              <Col extraStyle={[{padding:15}]}>
                <Input
                  placeholder='Name (English)'
                  inputContainerStyle={[stylesC.fieldP,{marginTop:0,marginHorizontal:0}]}
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({name_en:text})}
                  value={this.state.name_en}
                  blurOnSubmit={false}/>
                <Input
                  placeholder='Name (Assamese)'
                  inputContainerStyle={[stylesC.fieldP,{marginTop:0,marginHorizontal:0}]}
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({name_as:text})}
                  value={this.state.name_as}/>
                <Button
                  label='Save'
                  activeOpacity={0.6}
                  buttonStyle={[stylesC.button45,{marginTop:10,marginHorizontal:10}]}
                  labelStyle={[stylesC.buttonT16]}
                  onPress={()=>{
                    this.editSubCat();
                  }}/>
                <Button
                  label='Delete'
                  activeOpacity={0.6}
                  buttonStyle={[stylesC.button45,{marginTop:10,marginHorizontal:10,backgroundColor:Colors.red}]}
                  labelStyle={[stylesC.buttonT16]}
                  onPress={()=>{
                    this.deleteSubCat();
                  }}/>
              </Col> 
            </ScrollView>
          </Col>
          <Loader
              containerStyle={[stylesC.loader]}
              animating={this.state.loading}/>
          <NavigationEvents
            onDidFocus={payload => {
              this.onFocus();
            }}/>
        </Content>
      </Container>
    );
  }

  deleteSubCat = ()=>{
    Alert.alert( // react-native
        'Delete Subcategory',
        'Are you sure you want to delete this Subcategory?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, // negative
          {text: 'Yes', onPress: () => {
            this.setState({loading:true});
            firestore()
                .collection(Collections.categories)
                .doc(this.state.catId)
                .collection(Collections.subcategories)
                .doc(''+this.state.id)
                .delete()
                .then((ref) => { 
                  console.log('delete:'+ref);
                  this.props.navigation.goBack();
                });
          }}, // positive
        ],
        {
          cancelable: true
        }
      );
  };

  editSubCat = ()=>{
    if(this.state.name_en === ''){
      return;
    }
    this.setState({loading:true});
    firestore()
      .collection(Collections.categories)
      .doc(this.state.catId)
      .collection(Collections.subcategories)
      .doc(''+this.state.id)
      .set({
        'id': ''+this.state.id,
        'name_en': this.state.name_en,
        'name_as': this.state.name_as,
      })
      .then((ref) => { 
        console.log('ref:'+ref);
        showSuccessToast('Subcategory Updated!');
        this.props.navigation.goBack();
      });
  };

  async componentDidMount(){
    let item = this.props.navigation.getParam('item');
    let catId = this.props.navigation.getParam('catId');
    this.setState({
        catId:catId, 
        id:item.id,
        name_en:item.title,
        name_as:item.title_as,
    });
  }

  onFocus = async ()=>{
    
  };

}

export default AdminEditSubCat