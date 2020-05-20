import React from 'react';
import {View,Text,Alert, ScrollView,TouchableOpacity,Image} from 'react-native';
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
import AsyncImage from '../view/async_image.js';

const options = {
  title: 'Select Icon'
};

class AdminEditCat extends React.Component {
  static navigationOptions = {
    header: null ,
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  state = {
    loading:false,
    id:'',
    name_en:'',
    name_as:'',
    newPhoto:null,
    oldPhoto:'',
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
                Edit Category
              </Text>
            </LinearGradient>
            <BackButton
              onPress={()=>{
                this.props.navigation.goBack();
              }}/>
            <ScrollView>
              <Col center extraStyle={[{padding:15}]}>
                <Col center>
                  {this.state.newPhoto!==null?
                    <Image
                        resizeMode='contain'
                        style={{width:100,height:100}}
                        source={{uri:this.state.newPhoto.uri}}/>
                    :
                    <AsyncImage
                        image={this.state.oldPhoto===''? 'dummy.png' : this.state.oldPhoto}
                        style={{width:100,height:100,tintColor:Colors.themeDark}}/>
                  }
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
                  inputContainerStyle={[stylesC.fieldP,{marginTop:20,marginHorizontal:0}]}
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
                  buttonStyle={[stylesC.button45,{marginTop:0,marginHorizontal:10}]}
                  labelStyle={[stylesC.buttonT16]}
                  onPress={()=>{
                    this.updateCat();
                  }}/>
                <Button
                  label='Delete'
                  activeOpacity={0.6}
                  buttonStyle={[stylesC.button45,{marginTop:10,marginHorizontal:10,backgroundColor:Colors.red}]}
                  labelStyle={[stylesC.buttonT16]}
                  onPress={()=>{
                    this.deleteCat();
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

  deleteCat = ()=>{
    Alert.alert( // react-native
        'Delete Category',
        'Are you sure you want to delete this Category?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, // negative
          {text: 'Yes', onPress: () => {
            this.setState({loading:true});
            firestore()
                .collection(Collections.categories)
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

  updateCat = ()=>{
    if(this.state.name_en === ''){
      return;
    }
    this.setState({loading:true});
    firestore()
      .collection(Collections.categories)
      .doc(''+this.state.id)
      .set({
        'id': ''+this.state.id,
        'name_en': this.state.name_en,
        'name_as': this.state.name_as,
        'icon': this.state.oldPhoto
      })
      .then((ref) => { 
        console.log('ref:'+ref);
        if(this.state.newPhoto !== null){
          this.uploadPhoto(this.state.id);
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
    let item = this.props.navigation.getParam('item');
    this.setState({
        id:item.id,
        name_en:item.title,
        name_as:item.title_as,
        oldPhoto:item.icon
    });
  }

  onFocus = async ()=>{
    
  };

}

export default AdminEditCat