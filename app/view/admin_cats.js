import React from 'react';
import {View,Text,FlatList, ScrollView,TouchableOpacity} from 'react-native';
import {Container,Content,Header,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import AppStringsAs from '../constants/strings_as.js';
import {stylesC} from '../styles/style_common.js';
import {Loader,Row,Col,Box,IconCustom,BackButton,Button} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import GLOBAL from '../constants/global.js';
import LinearGradient from 'react-native-linear-gradient';
import * as Collections from '../constants/firebase';
import firestore from '@react-native-firebase/firestore';
import AsyncImage from '../view/async_image.js';

class AdminCats extends React.Component {
  static navigationOptions = {
    header: null ,
  };ß

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  maxId = 0;

  state = {
    loading:false,
    models:[],
  };

  COLORS = ['#c9fbad','#adfbf4','#d0d3fc','#fac8cd','#fbe1ad','#fbcff6'];

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
              style={{width:'100%',height:55,backgroundColor:Colors.white,paddingHorizontal:15, alignItems:'center',justifyContent:'center'}}>
              <Text style={[stylesC.textDB18,{marginLeft:10,color:'white'}]}>
                Categories
              </Text>
            </LinearGradient>
            <BackButton
              onPress={()=>{
                this.props.navigation.goBack();
              }}/>
            <ScrollView>
            <Col extraStyle={[{padding:15}]}>
              <Button
                label='Add Category'
                activeOpacity={0.6}
                buttonStyle={[stylesC.button45,{marginTop:0,marginHorizontal:0}]}
                labelStyle={[stylesC.buttonT16]}
                onPress={()=>{
                  if(this.state.loading)
                    return;
                  this.props.navigation.navigate('AdminAddCat',{size: this.maxId});
                }}/>
              <View style={{marginTop:10,width:'100%'}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  horizontal={false}
                  data={this.state.models}
                  extraData={this.state} // refresh list on state change
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this._renderItem}/>
              </View>
            </Col>
            </ScrollView>
          </Col>
          <Loader
              containerStyle={[stylesC.loader]}
              animating={this.state.loading}/>
          <NavigationEvents
            onDidFocus={() => {
              this.onFocus();
            }}/>
        </Content>
      </Container>
    );
  }

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{flex:1}}
        activeOpacity={1}
        onPress={()=>{
          //
        }}>
        <Card
          noShadow
          style={{flex:1,padding:10,borderRadius:5,marginBottom:10}}>
          <Row center>
            <Col center extraStyle={{flex:1,marginLeft:0}}>
              <Box center extraStyle={[{backgroundColor:item.color,width:70,height:70,borderRadius:35}]}>
                <AsyncImage
                  image={item.icon===''? 'dummy.png' : item.icon}
                  style={{width:40,height:40,tintColor:Colors.themeDark}}/>
              </Box>
            </Col>
            <Col middleLeft extraStyle={{flex:3,marginLeft:15}}>
              <Text style={stylesC.textM16}>
                {item.title}
              </Text>
            </Col>
            <Col center extraStyle={{flex:1.5}}>
              <TouchableOpacity
                style={{width:100,height:30,alignItems:'center',justifyContent:'center'}}
                activeOpacity={0.6}
                onPress={()=>{
                  if(this.state.loading)
                    return;
                  this.props.navigation.navigate('AdminEditCat', {item:item});
                }}>
                <Text style={[stylesC.textD14,{color:'blue'}]}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{width:100,height:30,alignItems:'center',justifyContent:'center'}}
                activeOpacity={0.6}
                onPress={()=>{
                  if(this.state.loading)
                    return;
                  this.props.navigation.navigate('AdminSubCats',{id:item.id, title:item.title});
                }}>
                 <Text style={[stylesC.textD14,{color:'blue'}]}>
                  View
                </Text>
              </TouchableOpacity>
            </Col>
          </Row>
        </Card>
      </TouchableOpacity>
      
    );
  };

  async componentDidMount(){
    console.log("Home mount");
  }

  onFocus = async ()=>{
    console.log("Home focus");
    this.loadData(); 
  };

  loadData = async () => {
    this.setState({loading:true}); 
    const categories = await firestore()
      .collection(Collections.categories)
      .orderBy('id', 'asc')
      .get();
    let i=0;
    this.setState({loading:false, models:[]});
    categories.forEach(doc => {
      this.setState(state => {
        let data = doc.data();

        let id = parseInt(data.id);
        if(id > this.maxId){
          this.maxId = id;
        }

        if(i >= this.COLORS.length){
          i = 0;
        }
        let color = this.COLORS[i];
        let item = {
            id: data.id,
            title: data.name_en,
            title_as: data.name_as,
            icon: data.icon,
            color: color,
        };
        const models = state.models.concat(item);
        return {models: models};
      });
      i++;
    });
  };

}

export default AdminCats