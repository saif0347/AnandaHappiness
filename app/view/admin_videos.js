import React from 'react';
import {View,Text,FlatList, ScrollView,TouchableOpacity,Image} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import AppStringsAs from '../constants/strings_as.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton,Button,Loader,Row,Col,Box,Line,IconCustom} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import GLOBAL from '../constants/global.js';
import LinearGradient from 'react-native-linear-gradient';
import { Thumbnail } from 'react-native-thumbnail-video';
import * as Collections from '../constants/firebase';
import firestore from '@react-native-firebase/firestore';

class AdminVideos extends React.Component {
  static navigationOptions = {
    header: null ,
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  state = {
    catId:'',
    subCatId:'',
    title:'',
    models:[],
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
                  {this.state.title}
                </Text>
              </Row>
            </LinearGradient>
            <BackButton
              onPress={()=>{
                this.props.navigation.goBack();
              }}/>
            <ScrollView>
            <Col extraStyle={[{padding:15}]}>
              <Button
                label='Add Video'
                activeOpacity={0.6}
                buttonStyle={[stylesC.button45,{marginTop:0,marginHorizontal:0}]}
                labelStyle={[stylesC.buttonT16]}
                onPress={()=>{
                  if(this.state.loading)
                    return;
                  this.props.navigation.navigate('AdminAddVideo', {catId:this.state.catId, subCatId:this.state.subCatId, size:this.state.models.length});
                }}/>
              <View style={{width:'100%',marginTop:10}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  horizontal={false}
                  data={this.state.models}
                  ListEmptyComponent={
                    this.getEmptyPanel()
                  }
                  extraData={this.state} // refresh list on state change
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this._renderItem}/>
              </View>
            </Col>
            </ScrollView>
          </Col>
          <NavigationEvents
            onDidFocus={payload => {
              this.onFocus();
            }}/>
        </Content>
      </Container>
    );
  }

  getEmptyPanel = ()=>{
    return null;
  };

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{flex:1}}
        activeOpacity={0.6}
        onPress={()=>{
          //
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
            <Col middleLeft extraStyle={{flex:3,marginLeft:20}}>
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
                  this.props.navigation.navigate('AdminEditVideo',{item:item, catId:this.state.catId, subCatId:this.state.subCatId, id:item.id});
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

  async componentDidMount(){
    console.log("Videos mount");
    let catId = this.props.navigation.getParam('catId');
    let subCatId = this.props.navigation.getParam('subCatId');
    let title = this.props.navigation.getParam('title');
    let models = this.props.navigation.getParam('models');
    this.setState({catId:catId, subCatId:subCatId, title:title, models:models});
  }

  onFocus = async ()=>{
    setTimeout(()=>{
      this.loadVideos();
    }, 50)
  };

  loadVideos = async ()=>{
    console.log('loadVideos');
    let videos = await firestore()
      .collection(Collections.categories)
      .doc(this.state.catId)
      .collection(Collections.subcategories)
      .doc(this.state.subCatId)
      .collection(Collections.videos)
      .orderBy('id', 'desc')
      .get();
    this.setState({loading:false});
    let models = [];
    let i=0;
    if(videos.size == 0){
      this.setState({models:models});
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
        this.setState({models:models});
      }
    });
  };

}

export default AdminVideos