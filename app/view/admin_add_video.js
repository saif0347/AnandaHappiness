import React from 'react';
import {View,Text,FlatList, ScrollView,TouchableOpacity,Image} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import AppStringsAs from '../constants/strings_as.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton,Button,Loader,Row,Col,Box,Line,IconCustom,showToast,showSuccessToast} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import GLOBAL from '../constants/global.js';
import LinearGradient from 'react-native-linear-gradient';
import {Input} from 'react-native-elements';
import * as Collections from '../constants/firebase';
import firestore from '@react-native-firebase/firestore';

class AdminAddVideo extends React.Component {
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
    subCatId:'',
    size:0,
    name_en:'',
    name_as:'',
    desc_en:'',
    desc_as:'',
    link:''
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
                Add Video
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
                  value={this.state.name_as}
                  blurOnSubmit={false}/>
                <Input
                  placeholder='Description (English)'
                  inputContainerStyle={[stylesC.fieldP,{marginTop:0,marginHorizontal:0}]}
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({desc_en:text})}
                  value={this.state.desc_en}
                  blurOnSubmit={false}/>
                <Input
                  placeholder='Description (Assamese)'
                  inputContainerStyle={[stylesC.fieldP,{marginTop:0,marginHorizontal:0}]}
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({desc_as:text})}
                  value={this.state.desc_as}
                  blurOnSubmit={false}/>
                <Input
                  placeholder='Youtube Link'
                  inputContainerStyle={[stylesC.fieldP,{marginTop:0,marginHorizontal:0}]}
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({link:text})}
                  value={this.state.link}/>
                <Button
                  label='Save'
                  activeOpacity={0.6}
                  buttonStyle={[stylesC.button45,{marginTop:15,marginHorizontal:10}]}
                  labelStyle={[stylesC.buttonT16]}
                  onPress={()=>{
                    this.addVideo();
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

  addVideo = async ()=>{
    if(this.state.name_en === '' || this.state.name_as === '' || this.state.desc_en === '' || this.state.desc_as === '' || this.state.link === ''){
      showToast('Fill complete form');
      return;
    }
    let videoId = parseInt(this.state.size);
    videoId = videoId+1;
    console.log('videoId: '+videoId);
    this.setState({loading:true});
    if(this.state.subCatId !== ''){
      firestore()
        .collection(Collections.categories)
        .doc(this.state.catId)
        .collection(Collections.subcategories)
        .doc(this.state.subCatId)
        .collection(Collections.videos)
        .doc(''+videoId)
        .set({
          'id': ''+videoId,
          'title_en': this.state.name_en,
          'title_as': this.state.name_as,
          'desc_en': this.state.desc_en,
          'desc_as': this.state.desc_as,
          'link': this.state.link,
        })
        .then((ref) => { 
          console.log('ref:'+ref);
          this.videoAdded(videoId);
        });
    }
    else{
      firestore()
        .collection(Collections.categories)
        .doc(this.state.catId)
        .collection(Collections.videos)
        .doc(''+videoId)
        .set({
          'id': ''+videoId,
          'title_en': this.state.name_en,
          'title_as': this.state.name_as,
          'desc_en': this.state.desc_en,
          'desc_as': this.state.desc_as,
          'link': this.state.link,
        })
        .then((ref) => { 
          console.log('ref:'+ref);
          this.videoAdded(videoId);
        });
    }
  };

  videoAdded = (videoId)=>{
    showSuccessToast('Video Added');
    this.setState({
      loading:false,
      name_en:'',
      name_as:'',
      desc_en:'',
      desc_as:'',
      link:'',
      size:videoId
    });
  };

  async componentDidMount(){
    let catId = this.props.navigation.getParam('catId');
    let subCatId = this.props.navigation.getParam('subCatId');
    let size = this.props.navigation.getParam('size');
    console.log('catId: '+catId);
    console.log('subCatId: '+subCatId);
    console.log('size: '+size);
    this.setState({catId:catId, subCatId:subCatId, size:size});
  }

  onFocus = async ()=>{
    
  };

}

export default AdminAddVideo