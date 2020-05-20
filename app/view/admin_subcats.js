import React from 'react';
import {View,Text,FlatList, ScrollView,TouchableOpacity,BackHandler} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import AppStringsAs from '../constants/strings_as.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton,Button,Loader,Row,Col,Box,Line,IconCustom} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import * as Collections from '../constants/firebase';
import firestore from '@react-native-firebase/firestore';
import { Thumbnail } from 'react-native-thumbnail-video';
import GLOBAL from '../constants/global.js';
import Utils from '../util/utils.js';

class AdminSubCats extends React.Component {
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
    title:'',
    subCats:true,
    showSubCats:true,
    models1:[],
    models2:[],
  };

  render(){
    return (
      <Container>
        <Header
          androidStatusBarColor={Colors.theme1}
          style={[stylesC.header,{height:0}]}>
        </Header>
        <Content contentContainerStyle={[stylesC.mainWithLoader]}>
          <Col extraStyle={[stylesC.main]}>
            <LinearGradient 
              colors={[Colors.theme1, Colors.theme, Colors.background]} 
              style={{width:'100%',height:55,backgroundColor:Colors.white, alignItems:'center',justifyContent:'center'}}>
              <Row extraStyle={[{width:'100%',height:55,paddingHorizontal:15}]}>
                <Text style={[stylesC.textDB18,{flex:1,color:'white',textAlign:'center'}]}>
                  {this.state.title}
                </Text>
              </Row>
            </LinearGradient>
            <BackButton
                onPress={()=>{
                  console.log('back');
                  this.handleBack();
                }}/>
            <ScrollView>
            <Col extraStyle={[{padding:15}]}>
              <Button
                label='Add Subcategory'
                activeOpacity={0.6}
                buttonStyle={[stylesC.button45,{marginTop:0,marginHorizontal:0}]}
                labelStyle={[stylesC.buttonT16]}
                onPress={()=>{
                  if(this.state.loading)
                    return;
                  this.props.navigation.navigate('AdminAddSubCat', {catId:this.state.id, size:this.state.models1.length});
                }}/>
              <Button
                label='Add Video'
                activeOpacity={0.6}
                buttonStyle={[stylesC.button45,{marginTop:10,marginHorizontal:0}]}
                labelStyle={[stylesC.buttonT16]}
                onPress={()=>{
                  if(this.state.loading)
                    return;
                  this.props.navigation.navigate('AdminAddVideo', {catId:this.state.id, subCatId:'', size:this.state.models2.length});
                }}/>
              <View style={{width:'100%',marginTop:10}}>
                {this.state.showSubCats? 
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    ListEmptyComponent={
                      this.getEmptyPanel()
                    }
                    data={this.state.models1}
                    extraData={this.state} // refresh list on state change
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItemSubCats}/>
                    :
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    ListEmptyComponent={
                      this.getEmptyPanel()
                    }
                    data={this.state.models2}
                    extraData={this.state} // refresh list on state change
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItemVideos}/>
                }
              </View>
            </Col>
            </ScrollView>
          </Col>
          <Loader
              containerStyle={[stylesC.loader]}
              animating={this.state.loading}/>
          <NavigationEvents
            onDidFocus={payload => {
              this.onFocus();
            }}
            onDidBlur={payload => {
              this.onBlur();
            }}/>
        </Content>
      </Container>
    );
  }

  getEmptyPanel = ()=>{
    return null;
  };

  _renderItemSubCats = ({item}) => {
    console.log('_renderItemSubCats');
    return (
      <TouchableOpacity
        style={{flex:1}}
        activeOpacity={0.6}
        onPress={()=>{
          //
        }}>
        <Card
          noShadow
          style={{flex:1,padding:10,borderRadius:5,marginBottom:10}}>
          <Row center>
            <Col middleLeft extraStyle={{flex:4,marginLeft:20}}>
              <Text style={stylesC.textM16}>
                {item.title}
              </Text>
            </Col>
            <Col center extraStyle={{flex:1}}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={()=>{
                  if(this.state.loading)
                    return;
                  this.props.navigation.navigate('AdminEditSubCat', {item:item, catId:this.state.id});
                }}>
                <Text style={[stylesC.textD14,{color:'blue'}]}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginTop:10}}
                activeOpacity={0.6}
                onPress={()=>{
                  this.loadSubCatVideos(item.id, item.title);
                }}>
                 <Text style={[stylesC.textD14,{color:'blue'}]}>
                  Videos
                </Text>
              </TouchableOpacity>
            </Col>
          </Row>
        </Card>
      </TouchableOpacity>
    );
  };

  _renderItemVideos = ({item}) => {
    console.log('_renderItemVideos');
    return (
      <TouchableOpacity
        style={{flex:1}}
        activeOpacity={1}
        onPress={()=>{
          //this.props.navigation.navigate('VideoPlay',{title:item.title, desc:item.desc, link:item.link, from:'SubCats'});
        }}>
        <Card
          noShadow
          style={{height:120,marginBottom:10,flex:1,padding:15,alignItems:'center',justifyContent:'center'}}>
          <Row center>
            <Col middleLeft extraStyle={{flex:2,marginLeft:0}}>
              <Box center extraStyle={[{backgroundColor:Colors.lightGray}]}>
                <Thumbnail 
                    showPlayIcon={false}
                    url={item.link}
                    imageWidth={100}
                    imageHeight={70}/>
              </Box>
            </Col>
            <Col middleLeft extraStyle={{flex:3,marginLeft:15}}>
              <Text style={stylesC.textM16}>
                {item.title.length>50? item.title.substring(0,50)+'...' : item.title}
              </Text>
            </Col>
            <Col center extraStyle={{flex:1}}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={()=>{
                  if(this.state.loading)
                    return;
                  this.props.navigation.navigate('AdminEditVideo',{item:item, catId:this.state.id, subCatId:'', id:item.id});
                }}>
                <Text style={[stylesC.textD14,{color:'blue'}]}>
                  Edit
                </Text>
              </TouchableOpacity>
            </Col>
          </Row>
        </Card>
      </TouchableOpacity>
    );
  };

  onBlur = async ()=>{
    console.log("SubCats onBlur");
  };

  handleBack = ()=>{
    this.props.navigation.goBack();
  };

  async componentDidMount(){
    console.log("SubCats mount");
    let id = this.props.navigation.getParam('id');
    let title = this.props.navigation.getParam('title');
    this.setState({id:id, title:title});
  }

  onFocus = async ()=>{
    console.log("SubCats focus");
    setTimeout(()=>{
      this.loadData();
    }, 50);
  };

  loadData = async () => {
    this.setState({loading:true}); 
    let subCats = await firestore()
      .collection(Collections.categories)
      .doc(this.state.id)
      .collection(Collections.subcategories)
      .orderBy('id', 'asc')
      .get();
    console.log('subCats: '+subCats.size);
    if(subCats.size > 0){
        // load subCats
        this.loadSubCats(subCats);
    }
    else{
        // load videos
        this.loadVideos();
    }
  };

  loadSubCats = async (subCats)=>{
    console.log('loadSubCats');
    this.setState({loading:false, models1:[], subCats:true, showSubCats:true});
    subCats.forEach(doc => { 
        this.setState(state => {
          let data = doc.data();
          let  name = data.name_en;
          let item = {
              id: data.id,
              title: name,
              title_as: data.name_as
          };
          const models1 = state.models1.concat(item);
          return {models1: models1};
        });
    });
  };

  loadVideos = async ()=>{
    console.log('loadVideos');
    let videos = await firestore()
      .collection(Collections.categories)
      .doc(this.state.id)
      .collection(Collections.videos)
      .get();
    this.setState({loading:false, models2:[], subCats:false, showSubCats:false});
    this.showVideos(videos);
  };

  showVideos = (videos)=>{
    console.log('videos: '+videos.size);
    videos.forEach(doc => { 
        this.setState(state => {
        let data = doc.data();
        let title = data.title_en;
        let desc = data.desc_en;
        let item = {
            id: data.id,
            title: title,
            desc: desc,
            title_as: data.title_as,
            desc_as: data.desc_as,
            link: data.link
        };
        const models2 = state.models2.concat(item);
        return {models2: models2};
      });
    });
  };

  loadSubCatVideos = async (id, title_)=>{
    console.log('loadVideos');
    let videos = await firestore()
      .collection(Collections.categories)
      .doc(this.state.id)
      .collection(Collections.subcategories)
      .doc(id)
      .collection(Collections.videos)
      .orderBy('id', 'desc')
      .get();
    this.setState({loading:false});
    let models = [];
    let i=0;
    if(videos.size == 0){
      this.props.navigation.navigate('AdminVideos',{catId:this.state.id, subCatId:id, title:title_, models:models});
      return;
    }
    videos.forEach(doc => { 
      let data = doc.data();
      let title = data.title_en;
      let desc = data.desc_en;
      let item = {
          id: data.id,
          title: title,
          desc: desc,
          title_as: data.title_as,
          desc_as: data.desc_as,
          link: data.link
      };
      models = models.concat(item);
      i++;
      if(i >= videos.size){
        this.props.navigation.navigate('AdminVideos',{catId:this.state.id, subCatId:id, title:title_, models:models});
      }
    });
  };

}

export default AdminSubCats;