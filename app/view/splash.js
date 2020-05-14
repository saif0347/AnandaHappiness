import React from 'react';
import {Platform,View,SafeAreaView,StatusBar,Text,Image} from 'react-native';
import * as Colors from '../constants/colors.js';
import {stylesC} from '../styles/style_common.js';
import {Col,Spinner} from '../custom/components.js';
import Utils from '../util/utils.js';
import AppStrings from '../constants/strings.js';
import AppStringsAs from '../constants/strings_as.js';
import MyStorage from '../storage/storage.js';
import GLOBAL from '../constants/global.js';
var Sound = require('react-native-sound');

class Splash extends React.Component {
  static navigationOptions = {
    header:null
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

  state = {showPicker: 'false', index:'0'};

  langSelected = async ()=>{
    console.log('index: '+this.state.index);
    if(this.state.index == '1'){
      GLOBAL.lang = 'en';
      AppStrings.instance = null;
      Strings = AppStrings.getInstance();
      await MyStorage.setLanguage('en');
    }
    else if(this.state.index == '2'){
      GLOBAL.lang = 'as';
      AppStringsAs.instance = null;
      Strings = AppStringsAs.getInstance();
      await MyStorage.setLanguage('as');
    }
    this.forceUpdate();
    this.navigateScreen();
  };

  render(){
    let language;
    if(this.state.showPicker === 'true'){
      console.log('show picker');
      language =
                <View style={[{marginTop:20,width:250,height:40}]}>
                  <Spinner
                    onValueChange={(value, index)=>{
                      this.setState({index: ''+index});
                      if(Platform.OS=='ios' || index==0){
                        return;
                      }
                      setTimeout(()=>{
                        this.langSelected();
                      }, 500);
                    }}
                    onDonePress={()=>{
                      setTimeout(()=>{
                        this.langSelected();
                      }, 500);
                    }}
                    placeholder='Select Language'
                    items={[
                      {label:'English',value:'0'},
                      {label:'Assamese',value:'1'}
                     ]}/>
                </View>
    }
    else{
      console.log('hide picker');
      language = null;
    }

    return (
      <Col extraStyle={[stylesC.mainSplash,{backgroundColor:Colors.theme}]}>
        <Image
          resizeMode='contain'
          style={stylesC.logoSplash}
          source={require('../assets/logo.png')}/>
          <Text style={[stylesC.textMB22,{marginTop:20,marginHorizontal:40,textAlign:'center',color:'white'}]}>
            {Strings.app_name}
          </Text>
          <Text style={[stylesC.textMB16,{marginTop:5,marginBottom:20,marginHorizontal:40,textAlign:'center',color:'white'}]}>
            {Strings.app_info}
          </Text>
        {language}
      </Col>
    );
  }

  navigateScreen = ()=>{
    console.log('navigateScreen');
    Utils.moveToAnotherStack(this.props.navigation, 'Home');
  };

  async componentDidMount(){
    console.log("splash mount");
    this.playAudio();
    let firstOpen = await MyStorage.isFirstOpen();
    this.setState({showPicker: firstOpen});
    if(firstOpen === 'false'){
      setTimeout(this.navigateScreen, 1000);
    }
    await MyStorage.setFirstOpen('false');
  }

  playAudio = ()=>{
    console.log('playAudio');
    var whoosh = new Sound('ananda.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
      // Play the sound with an onEnd callback
      whoosh.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };
}

export default Splash