import React from 'react';
import {Text,ScrollView} from 'react-native';
import {Container,Content} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import AppStringsAs from '../constants/strings_as.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton,Row,Col} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import YouTube from 'react-native-youtube';
import GLOBAL from '../constants/global.js';
import Utils from '../util/utils.js';

class VideoPlay extends React.Component {
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
    title:'',
    desc:'',
    videoId:'',
    height:301,
    from:'',
  };

  render(){
    return (
      <Container>
        <Content contentContainerStyle={[stylesC.mainWithLoader]}>
          <Col extraStyle={[stylesC.main]}>
            <LinearGradient 
              colors={[Colors.theme1, Colors.theme, Colors.background]} 
              style={{width:'100%',height:55,backgroundColor:Colors.white, alignItems:'center',justifyContent:'center'}}>
              <Row extraStyle={[{width:'100%',height:55,paddingHorizontal:15}]}>
                <Text style={[stylesC.textDB18,{flex:1,color:'white',textAlign:'center'}]}>
                  {Strings.vp}
                </Text>
              </Row>
            </LinearGradient>
            <BackButton
              onPress={()=>{
                if(this.state.from === 'SubCats'){
                  Utils.moveToScreen(this.props.navigation, 'Home','SubCats');
                }
                else{
                  Utils.moveToScreen(this.props.navigation, 'Home','Videos');
                }
              }}/>
            <ScrollView>
              <Col extraStyle={[{padding:0}]}>
                
                {this.state.videoId !== ''?
                  <YouTube
                    apiKey='AIzaSyAQXOc84fdH_4sPvdzwGpAwVpdufBWfie8'
                    videoId={this.state.videoId} // The YouTube video ID
                    play // control playback of video with true/false
                    fullscreen={false} // control whether the video should play in fullscreen or inline
                    onReady={e => this.setState({ height: 300 })}
                    onChangeState={e => console.log('quality:'+e.state)}
                    onChangeQuality={e => console.log('quality:'+e.quality)}
                    onError={e => console.log('error:'+e.error)}
                    style={{ alignSelf: 'stretch', height: this.state.height }}/>
                  :
                  null
                }
                <Col extraStyle={[{padding:15}]}>
                  <Text style={[stylesC.textD18,{marginTop:20}]}>
                    {this.state.title}
                  </Text>
                  <Text style={[stylesC.textD14,{marginTop:10}]}>
                    {this.state.desc}
                  </Text>
                </Col>
              </Col>
            </ScrollView>
          </Col>
          <NavigationEvents
            onDidFocus={() => {
              this.onFocus();
            }}/>
        </Content>
      </Container>
    );
  }

  async componentDidMount(){
    console.log("VideoPlay mount");
    let title = this.props.navigation.getParam('title');
    let desc = this.props.navigation.getParam('desc');
    let from = this.props.navigation.getParam('from');

    let url = this.props.navigation.getParam('link');
    var regex = /[?&]([^=#]+)=([^&#]*)/g;
    var match;
    let videoId = '';
    while (match = regex.exec(url)) {
      if(match[1] === 'v'){
        videoId = match[2];
      };
    }
    console.log('videoId: '+videoId);

    this.setState({title:title, desc:desc, videoId:videoId, from:from});
  }

  onFocus = async ()=>{
    
  };

}

export default VideoPlay