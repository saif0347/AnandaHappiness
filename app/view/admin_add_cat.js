import React from 'react';
import {View,Text,FlatList, ScrollView,TouchableOpacity,Image} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import AppStringsAs from '../constants/strings_as.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton,Button,Loader,Row,Col,Box,Line,showSuccessToast} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import GLOBAL from '../constants/global.js';
import LinearGradient from 'react-native-linear-gradient';
import {Input} from 'react-native-elements';
import * as Collections from '../constants/firebase';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const options = {
  title: 'Select Icon'
};

class AdminAddCat extends React.Component {
  static navigationOptions = {
    header: null ,
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  state = {
    loading:false,
    size:0,
    name_en:'',
    name_as:'',
    newPhoto:null,
    oldPhoto:require('../assets/logo.png'),
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
                Add Category
              </Text>
            </LinearGradient>
            <BackButton
              onPress={()=>{
                this.props.navigation.goBack();
              }}/>
            <ScrollView>
              <Col center extraStyle={[{padding:15}]}>
                <Col center>
                  <Image
                    resizeMode='contain'
                    style={{width:100,height:100}}
                    source={this.state.newPhoto==null? this.state.oldPhoto : {uri:this.state.newPhoto.uri}}/>
                  <Button
                    label='Browse'
                    activeOpacity={0.6}
                    buttonStyle={[stylesC.button30,{width:120,marginTop:10,marginHorizontal:0,alignSelf:'center'}]}
                    labelStyle={[stylesC.buttonT16]}
                    onPress={()=>{
                      this.showImagePicker();
                    }}/>
                </Col>
                <Input
                  placeholder='Name (English)'
                  inputContainerStyle={{marginTop:20}}
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({name_en:text})}
                  value={this.state.name_en}/>
                <Input
                  placeholder='Name (Assamese)'
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({name_as:text})}
                  value={this.state.name_as}/>
                <Button
                  label='Save'
                  activeOpacity={0.6}
                  buttonStyle={[stylesC.button45,{marginTop:0,marginHorizontal:10}]}
                  labelStyle={[stylesC.buttonT16]}
                  onPress={()=>{
                    this.addCat();
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

  showImagePicker = ()=>{
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response: ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({newPhoto:response});
      }
    });
  };

  addCat = ()=>{
    if(this.state.newPhoto == null){
      return;
    }
    if(this.state.name_en === ''){
      return;
    }
    this.setState({loading:true});
    let id = parseInt(this.state.size)+1;
    firestore()
      .collection(Collections.categories)
      .doc(''+id)
      .set({
        'id': ''+id,
        'name_en': this.state.name_en,
        'name_as': this.state.name_as,
        'icon': ''
      })
      .then((ref) => { 
        console.log('ref:'+ref);
        if(this.state.newPhoto !== null){
          this.uploadPhoto(id);
        }
      });
  };

  uploadPhoto = (docId)=>{
    const name = new Date().getTime();
    const ext = 'png' // Extract image extension
    const filename = `${name}.${ext}`; // Generate unique name
    console.log('filename: '+filename);
    this.setState({ loading: true });
    storage()
      .ref(filename)
      .putFile(this.state.newPhoto.uri)
      .then(()=>{
        console.log('then');
        firestore()
          .collection(Collections.categories)
          .doc(''+docId)
          .set({
            'id': ''+docId,
            'name_en': this.state.name_en,
            'name_as': this.state.name_as,
            'icon': filename
          })
          .then((ref) => { 
            console.log('ref:'+ref);
            //showSuccessToast('Category Added!');
            this.props.navigation.goBack();
          });
      });
  };

  async componentDidMount(){
    let size = this.props.navigation.getParam('size');
    this.setState({size:size});
  }

  onFocus = async ()=>{
    
  };

}

export default AdminAddCat