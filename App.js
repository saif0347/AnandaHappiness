import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Splash from './app/view/splash.js';
import Home from './app/view/home.js';
import SubCats from './app/view/subcats.js';
import Videos from './app/view/videos.js';
import VideoPlay from './app/view/video_play.js';
import AboutUs from './app/view/about.js';
import {Root} from "native-base";
import GLOBAL from './app/constants/global.js';
import MyStorage from './app/storage/storage.js';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {IconCustom} from './app/custom/components';
import * as Colors from './app/constants/colors.js';
import {stylesC} from './app/styles/style_common.js';

const SplashStack = createStackNavigator({
  Splash: Splash,
},{
  /* The header settings */
  defaultNavigationOptions: null
});

const HomeStack = createStackNavigator({
  Home: Home,
  SubCats: SubCats,
  Videos: Videos
},{
  /* The header settings */
  defaultNavigationOptions: null
});

const VideoPlayStack = createStackNavigator({
  VideoPlay: VideoPlay
},{
  /* The header settings */
  defaultNavigationOptions: null
});

const AboutStack = createStackNavigator({
  AboutUs: AboutUs
},{
  /* The header settings */
  defaultNavigationOptions: null
});

const Tabs = createBottomTabNavigator(
  {
    Home: { 
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home'
      }
    },
    About: { 
      screen: AboutStack,
      navigationOptions: {
        tabBarLabel: 'About Us'
      }
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let icon;
        if (routeName === 'Home') {
          icon = require('./app/assets/home.png');
        } 
        else if (routeName === 'About') {
          icon = require('./app/assets/about.png');
        }
        return (
          <IconCustom
            conatinerStyle={[stylesC.center]}
            imageStyle={[stylesC.imageM24,{tintColor:tintColor, width:30, height:30}]}
            resizeMode='contain'
            source={icon}/>
        );
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Colors.themeDark,
      inactiveTintColor: 'gray',
      style:{height:60,paddingTop:5,paddingBottom:5,backgroundColor:Colors.tabBar,borderTopColor:Colors.lightGray},
    },
  }
);

const MainStack = createStackNavigator({
    Splash: SplashStack,
    Home: Tabs,
    VideoPlay: VideoPlayStack
  },{
    initialRouteName: 'Splash',
    headerMode: 'none'
});

const AppContainer = createAppContainer(MainStack);

export default class App extends Component<Props> {

  state = {waiting:true};

  render() {
    console.log('App render');
    console.disableYellowBox = true;
    if(this.state.waiting){
      return null;
    }
    return <Root>
                <AppContainer/>
            </Root>;
  }

  async componentDidMount() {
    let lang = await MyStorage.getLanguage();
    GLOBAL.lang = lang;
    this.setState({waiting:false});
  }

}