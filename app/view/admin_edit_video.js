import React from 'react';
import {View,Text,Alert, ScrollView,TouchableOpacity,Image} from 'react-native';
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

class AdminEditVideo extends React.Component {
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
    videoId:'',
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
                Edit Video
              </Text>
            </LinearGradient>
            <BackButton
              onPress={()=>{
                this.props.navigation.goBack();
              }}/>
            <ScrollView>
              <Col extraStyle={[{padding:15}]}>
                <Input
                  multiline={true}
                  placeholder='Title (English)'
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({name_en:text})}
                  value={this.state.name_en}
                  blurOnSubmit={false}/>
                <Input
                  multiline={true}
                  placeholder='Title (Assamese)'
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({name_as:text})}
                  value={this.state.name_as}
                  blurOnSubmit={false}/>
                <Input
                  multiline={true}
                  placeholder='Description (English)'
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({desc_en:text})}
                  value={this.state.desc_en}
                  blurOnSubmit={false}/>
                <Input
                  multiline={true}
                  placeholder='Description (Assamese)'
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({desc_as:text})}
                  value={this.state.desc_as}
                  blurOnSubmit={false}/>
                <Input
                  placeholder='Youtube Link'
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({link:text})}
                  value={this.state.link}/>
                <Button
                  label='Save Changes'
                  activeOpacity={0.6}
                  buttonStyle={[stylesC.button45,{marginTop:15,marginHorizontal:10}]}
                  labelStyle={[stylesC.buttonT16]}
                  onPress={()=>{
                    this.updateVideo();
                  }}/>
                <Button
                  label='Delete'
                  activeOpacity={0.6}
                  buttonStyle={[stylesC.button45,{marginTop:10,marginHorizontal:10,backgroundColor:Colors.red}]}
                  labelStyle={[stylesC.buttonT16]}
                  onPress={()=>{
                    this.deleteVideo();
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

  deleteVideo = ()=>{
    Alert.alert( // react-native
      'Delete Video',
      'Are you sure you want to delete this video?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, // negative
        {text: 'Yes', onPress: () => {
          this.setState({loading:true});
          if(this.state.subCatId !== ''){
            firestore()
              .collection(Collections.categories)
              .doc(''+this.state.catId)
              .collection(Collections.subcategories)
              .doc(''+this.state.subCatId)
              .collection(Collections.videos)
              .doc(''+this.state.videoId)
              .delete()
              .then((ref) => { 
                console.log('delete:'+ref);
                this.props.navigation.goBack();
              });
          }
          else{
            firestore()
              .collection(Collections.categories)
              .doc(''+this.state.catId)
              .collection(Collections.videos)
              .doc(''+this.state.videoId)
              .delete()
              .then((ref) => { 
                console.log('delete:'+ref);
                this.props.navigation.goBack();
              });
          }
        }}, // positive
      ],
      {
        cancelable: true
      }
    );
  };

  getYoutubeId = (url)=>{
    var regex = /[?&]([^=#]+)=([^&#]*)/g;
    var match;
    let videoId = '';
    while (match = regex.exec(url)) {
      if(match[1] === 'v'){
        videoId = match[2];
      };
    }
    console.log('youtubeId: '+videoId);
    return videoId;
  };

  updateVideo = async ()=>{
    if(this.state.name_en === '' || this.state.name_as === '' || this.state.desc_en === '' || this.state.desc_as === '' || this.state.link === ''){
      showToast('Fill complete form');
      return;
    }
    console.log('videoId: '+this.state.videoId);
    this.setState({loading:true});

    let url = 'https://www.youtube.com/watch?v='+this.state.link;
    console.log('youtubeUrl: '+url);

    if(this.state.subCatId !== ''){
      firestore()
        .collection(Collections.categories)
        .doc(this.state.catId)
        .collection(Collections.subcategories)
        .doc(this.state.subCatId)
        .collection(Collections.videos)
        .doc(''+this.state.videoId)
        .set({
          'id': ''+this.state.videoId,
          'title_en': this.state.name_en,
          'title_as': this.state.name_as,
          'desc_en': this.state.desc_en,
          'desc_as': this.state.desc_as,
          'link': url,
        })
        .then((ref) => { 
          console.log('ref:'+ref);
          this.videoUpdated();
        });
    }
    else{
      firestore()
        .collection(Collections.categories)
        .doc(this.state.catId)
        .collection(Collections.videos)
        .doc(''+this.state.videoId)
        .set({
          'id': ''+this.state.videoId,
          'title_en': this.state.name_en,
          'title_as': this.state.name_as,
          'desc_en': this.state.desc_en,
          'desc_as': this.state.desc_as,
          'link': url,
        })
        .then((ref) => { 
          console.log('ref:'+ref);
          this.videoUpdated();
        });
    }
  };

  videoUpdated = ()=>{
    showSuccessToast('Video Updated');
    this.props.navigation.goBack();
  };

  async componentDidMount(){
    let item = this.props.navigation.getParam('item');
    let catId = this.props.navigation.getParam('catId');
    let subCatId = this.props.navigation.getParam('subCatId');
    let videoId = this.props.navigation.getParam('id');
    console.log('catId: '+catId);
    console.log('subCatId: '+subCatId);
    console.log('videoId: '+videoId);

    let youtubeId = this.getYoutubeId(item.link);

    this.setState({
        catId:catId, 
        subCatId:subCatId, 
        videoId:videoId,
        name_en:item.title,
        name_as:item.title_as,
        desc_en:item.desc,
        desc_as:item.desc_as,
        link:youtubeId
    });
  }

  onFocus = async ()=>{
    
  };

}

export default AdminEditVideo