import React from 'react';
import {View,Text,TouchableOpacity,Image,Modal,
        TouchableWithoutFeedback,ActivityIndicator,Platform,TextInput} from 'react-native';
import {Icon,CheckBox,Input} from 'react-native-elements';
import {Card} from 'native-base';
import {loaderSize,stylesC,getCircleEmpty,getCircleFill} from '../styles/style_common.js';
import * as Colors from '../constants/colors.js';
import {Toast} from "native-base";
import RNPickerSelect from 'react-native-picker-select';
//import Autocomplete from 'react-native-autocomplete-input';

export const showToast = (text)=>{
  Toast.show({
    text: text,
    buttonText: '',
    textStyle: {},
    buttonTextStyle: {},
    buttonStyle: {},
    type: 'danger', // success, warning
    duration: 1500,
  })
}

export const showSuccessToast = (text)=>{
  Toast.show({
    text: text,
    buttonText: '',
    textStyle: {},
    buttonTextStyle: {},
    buttonStyle: {},
    type: 'success', // success, warning
    duration: 1500,
  })
}

// export class AutoCompleteTextView extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       query: this.props.value,
//       key: '0'
//     };
//   }
//
//   shouldComponentUpdate(nextProps, nextState) {
//     return true;
//   }
//
//   // Note: objects are like {name:'Pakistan', code:'PK'} and filters on name field
//
//   _filterItems = (query)=>{
//     if(query === '') {
//       return [];
//     }
//     const regex = new RegExp(`${query.trim()}`, 'i');
//     let list = this.props.data.filter(query => query.name.search(regex) >= 0);
//     if(list.length > 3){
//       return [list[0], list[1], list[2]];
//     }
//     return list;
//   };
//
//   compare = (a, b) => {
//     return a.toLowerCase().trim() === b.toLowerCase().trim()
//   };
//
//   focus = () => {
//     this.query.focus();
//   };
//
//   update = (country)=>{
//     this.setState({query:country, key:this.state.key=='0'? '1' : '0'});
//   };
//
//   render(){
//     const {query} = this.state;
//     const data = this._filterItems(query);
//     return (
//       <Autocomplete
//         containerStyle={{alignSelf:'stretch',borderWidth:0}}
//         inputContainerStyle={{borderWidth:0,paddingLeft:0,paddingRight:0}}
//         listStyle={{width:'100%',backgroundColor:'pink',position:'absolute',marginLeft:0,paddingLeft:10}}
//         data={data.length === 1 && this.compare(this.state.query, data[0].name) ? [] : data}
//         keyExtractor={(item, index) => index.toString()}
//         defaultValue={this.state.query}
//         onChangeText={(text)=>this.setState({query:text})}
//         renderItem={({item, i}) => (
//           <TouchableOpacity
//             style={{flex:1, height:45, justifyContent:'center'}}
//             onPress={() => {
//               this.setState({query:item.name, key:this.state.key=='0'? '1' : '0'});
//               this.props.onSelect(item.name);
//             }}>
//             <Text style={[stylesC.textD14]}>
//               {item.name}
//             </Text>
//           </TouchableOpacity>
//         )}
//         renderSeparator={()=>(
//           <Line
//             style={[stylesC.lineHM]}/>
//         )}/>
//     );
//   }
// }

// export class AutoCompleteTextView extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       query: this.props.value,
//       key: '0'
//     };
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     return true;
//   }

//   // Note: objects are like {name:'Pakistan', code:'PK'} and filters on name field

//   _filterItems = (query)=>{
//     if(query === '') {
//       return [];
//     }
//     const regex = new RegExp(`${query.trim()}`, 'i');
//     let list = this.props.data.filter(query => query.name.search(regex) >= 0);
//     if(list.length > 3){
//       return [list[0], list[1], list[2]];
//     }
//     return list;
//   };

//   compare = (a, b) => {
//     return a.toLowerCase().trim() === b.toLowerCase().trim()
//   };

//   focus = () => {
//     this.query.focus();
//   };

//   update = (country)=>{
//     this.setState({query:country, key:this.state.key=='0'? '1' : '0'});
//   };

//   _renderItem = ({item, i}) => (
//     <TouchableOpacity
//       style={{flex:1, height:45, justifyContent:'center'}}
//       onPress={() => {
//         this.setState({query:item.name, key:this.state.key=='0'? '1' : '0'});
//         this.props.onSelect(item.name);
//       }}>
//       <Text style={[stylesC.textD14]}>
//         {item.name}
//       </Text>
//     </TouchableOpacity>
//   );

//   render(){
//     const {query} = this.state;
//     let data = this._filterItems(query);
//     data = data.length === 1 && this.compare(this.state.query, data[0].name) ? [] : data
//     let height = (data.length * 45) + 70;
//     return (
//       <Autocomplete
//         containerStyle={{backgroundColor:'transparent', height:height, borderWidth:0}}
//         inputContainerStyle={{backgroundColor:'transparent',borderWidth:0,paddingLeft:0,paddingRight:0}}
//         listStyle={{width:'100%',marginLeft:0,paddingLeft:10}}
//         data={data}
//         keyExtractor={(item, index) => index.toString()}
//         renderTextInput={()=>{
//           return <TextField
//                     ref={(input)=>this.query=input}
//                     key={this.state.key}
//                     value={this.state.query}
//                     label={this.props.label}
//                     keyboardType='default'
//                     tintColor={Colors.fieldBorder}
//                     onChangeText={(text)=>{
//                       this.setState({query:text});
//                     }}
//                     onSubmitEditing={()=>this.props.onSubmitEditing(this.state.query)}
//                     onFocus={this.props.onFocus}/>
//         }}
//         renderItem={this._renderItem}
//         renderSeparator={()=>(
//           <Line
//             style={[stylesC.lineHM]}/>
//         )}/>
//     );
//   }
// }

export class Spinner extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.canUpdate) {
      return true;
    }
    return false;
  }
  render(){
    let height = 35;
    return (
      <View style={[stylesC.border,{flex:1, backgroundColor:'white',borderColor:'white', height:height, paddingLeft:10, paddingRight:8}, this.props.extraStyle]}>
        <Row spaceBetween extraStyle={[{flex:1}]}>
          <RNPickerSelect // npm install react-native-picker-select
            style={{
              viewContainer: {flex:1},
              inputIOS: {height:height},
              inputAndroid: {height:height},
            }}
            onValueChange={(value,index)=>{
              this.props.onValueChange(value,index);
            }}
            onDonePress={(value,index)=>{
              this.props.onDonePress(value,index);
            }}
            placeholderTextColor={Colors.textMedium}
            placeholder={{label:this.props.placeholder,value:null,color:Colors.textMedium}}
            items={this.props.items}/>
          {this.getArrow()}
        </Row>
      </View>
    );
  }

  getArrow = ()=>{
    if(Platform.OS === "android"){
      return null;
    }
    else{
      return (
        <MIcon
          style={[stylesC.center]}
          name='angle-down' //https://fontawesome.com/icons
          type='font-awesome'
          size={16}
          color={Colors.iconMedium}/>
      );
    }
  };
}

export class Button extends React.Component {
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.canUpdate) {
      return true;
    }
    return false;
  }

  render(){
    return (
      <TouchableOpacity
        style={this.props.buttonStyle}
        activeOpacity={this.props.activeOpacity}
        onPress={()=>{
          setTimeout(()=>{
            this.props.onPress();
          }, 100);
        }}>
        <Text style={this.props.labelStyle}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

export class ButtonFacebook extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  height = 60;
  render(){
    return (
      <TouchableOpacity
        style={[this.props.buttonStyle,{height:this.height,backgroundColor:'transparent'}]}
        activeOpacity={this.props.activeOpacity}
        onPress={()=>{
          this.props.onPress();
        }}>
        <Row spaceBetween>
          <Box center extraStyle={[{flex:1,borderTopLeftRadius:5,borderBottomLeftRadius:5,height:this.height,backgroundColor:Colors.buttonFacebookL}]}>
            <Icon
              name='facebook-f'
              type='font-awesome' //https://fontawesome.com/icons
              size={this.props.size}
              color={this.props.color}/>
          </Box>
          <Box middleLeft extraStyle={[{flex:5,borderTopRightRadius:5,borderBottomRightRadius:5,backgroundColor:Colors.buttonFacebook}]}>
            <Text style={[this.props.textStyle,{marginLeft:50}]}>
              {this.props.label}
            </Text>
          </Box>
        </Row>
      </TouchableOpacity>
    );
  }
}

export class ButtonTwitter extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  height = 60;
  render(){
    return (
      <TouchableOpacity
        style={[this.props.buttonStyle,{height:this.height,backgroundColor:'transparent'}]}
        activeOpacity={this.props.activeOpacity}
        onPress={()=>{
          this.props.onPress();
        }}>
        <Row spaceBetween>
          <Box center extraStyle={[{flex:1,borderTopLeftRadius:5,borderBottomLeftRadius:5,height:this.height,backgroundColor:Colors.buttonTwitterL}]}>
            <Icon
              name='twitter'
              type='font-awesome' //https://fontawesome.com/icons
              size={this.props.size}
              color={this.props.color}/>
          </Box>
          <Box middleLeft extraStyle={[{flex:5,borderTopRightRadius:5,borderBottomRightRadius:5,backgroundColor:Colors.buttonTwitter}]}>
            <Text style={[this.props.textStyle,{marginLeft:50}]}>
              {this.props.label}
            </Text>
          </Box>
        </Row>
      </TouchableOpacity>
    );
  }
}

export class ButtonGoogle extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  height = 60;
  render(){
    return (
      <TouchableOpacity
        style={[this.props.buttonStyle,{height:this.height,backgroundColor:'transparent'}]}
        activeOpacity={this.props.activeOpacity}
        onPress={()=>{
          this.props.onPress();
        }}>
        <Row spaceBetween>
          <Box center extraStyle={[{flex:1,borderTopLeftRadius:5,borderBottomLeftRadius:5,height:this.height,backgroundColor:Colors.buttonGoogleL}]}>
            <Icon
              name='google'
              type='font-awesome' //https://fontawesome.com/icons
              size={this.props.size}
              color={this.props.color}/>
          </Box>
          <Box middleLeft extraStyle={[{flex:5,borderTopRightRadius:5,borderBottomRightRadius:5,backgroundColor:Colors.buttonGoogle}]}>
            <Text style={[this.props.textStyle,{marginLeft:50}]}>
              {this.props.label}
            </Text>
          </Box>
        </Row>
      </TouchableOpacity>
    );
  }
}

export class MIcon extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.canUpdate) {
      return true;
    }
    return false;
  }
  render(){
    return (
      <View style={this.props.style}>
        <Icon
          name={this.props.name} //https://fontawesome.com/icons
          type={this.props.type}
          size={this.props.size}
          color={this.props.color}/>
      </View>
    );
  }
}

export class IconButton extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.canUpdate) {
      return true;
    }
    return false;
  }
  render(){
    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity}
        style={this.props.style}
        onPress={()=>{
          this.props.onPress();
        }}>
        <Icon
          name={this.props.name} //https://fontawesome.com/icons
          type={this.props.type}
          size={this.props.size}
          color={this.props.color}/>
      </TouchableOpacity>
    );
  }
}

export class BackButton extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render(){
    return (
      <View style={stylesC.headerLeftP}> 
        <IconCustomButton 
          activeOpacity={0.2}
          conatinerStyle={[stylesC.headerLeftIcon]}
          imageStyle={[stylesC.imageM20,{tintColor:Colors.headerTint}]}
          resizeMode='contain'
          source={require('../assets/back.png')}
          onPress={()=>{
            this.props.onPress();
          }}/>
      </View>
    );
  }
}

export class MenuButton extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render(){
    return (
      <View style={stylesC.headerLeftP}>
        <IconButton
          activeOpacity={0.2}
          style={[stylesC.headerLeftIcon,{marginLeft:3}]}
          name='bars' //https://fontawesome.com/icons
          type='font-awesome'
          size={24}
          color={Colors.headerTint}
          onPress={()=>{
            this.props.onPress();
          }}/>
      </View>
    );
  }
}

export class IconCustom extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.canUpdate) {
      return true;
    }
    return false;
  }
  render(){
    return (
      <View style={this.props.conatinerStyle}>
        <Image
          resizeMode={this.props.resizeMode}
          style={this.props.imageStyle}
          source={this.props.source}/>
      </View>
    );
  }
}

export class IconCustomButton extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.canUpdate) {
      return true;
    }
    return false;
  }
  render(){
    return (
      <TouchableOpacity
        style={this.props.conatinerStyle}
        activeOpacity={0.6}
        onPress={()=>{
          this.props.onPress();
        }}>
        <Image
          resizeMode={this.props.resizeMode}
          style={this.props.imageStyle}
          source={this.props.source}/>
      </TouchableOpacity>
    );
  }
}

export class RadioButton extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.checked === nextProps.checked) {
      return false;
    }
    else {
      return true;
    }
  }
  render(){
    return (
      <CheckBox
        size={this.props.size}
        checked={this.props.checked}
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor={this.props.checkedColor}
        uncheckedColor={this.props.uncheckedColor}
        title={this.props.title}
        containerStyle={this.props.containerStyle}
        textStyle={this.props.textStyle}
        onPress={()=>{
          this.props.onPress();
        }}/>
    );
  }
}

export class Circle extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  render(){
    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity}
        style={[this.props.shadow?stylesC.shadow:null, this.props.fill? getCircleFill(this.props.size,this.props.color) : getCircleEmpty(this.props.size,this.props.color,this.props.borderWidth)]}
        onPress={()=>{
          this.props.onPress();
        }}>
        {this.props.component}
      </TouchableOpacity>
    );
  }
}

export class ListItem extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  render(){
    return (
      <TouchableOpacity
        ref={c=>(this._root=c)}
        style={this.props.containerStyle}
        activeOpacity={this.props.activeOpacity}
        onPress={()=>{
          this.props.onPress();
        }}
        {...this.props}>
        <View style={this.props.parentStyle}>
          {this.props.children}
        </View>
        <View style={this.props.lineStyle}/>
      </TouchableOpacity>
    );
  }
}

export class ListItemCard extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  render(){
    return (
      <TouchableOpacity
        ref={c=>(this._root=c)}
        style={this.props.containerStyle}
        activeOpacity={this.props.activeOpacity}
        onPress={()=>{
          this.props.onPress();
        }}
        {...this.props}>
        <Card containerStyle={this.props.cardStyle}>
          <View style={this.props.parentStyle}>
            {this.props.children}
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

export class Start extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  getHorizontalStyle=()=>{
    if(this.props.stretch){
      return stylesC.colStretch;
    }
    else if(this.props.topLeft){
      return stylesC.colStart;
    }
    else if(this.props.middleLeft){
      return stylesC.colStart;
    }
    else if(this.props.bottomLeft){
      return stylesC.colStart;
    }
    else if(this.props.topCenter){
      return stylesC.colCenter;
    }
    else if(this.props.center){
      return stylesC.colCenter;
    }
    else if(this.props.bottomCenter){
      return stylesC.colCenter;
    }
    else if(this.props.topRight){
      return stylesC.colEnd;
    }
    else if(this.props.middleRight){
      return stylesC.colEnd;
    }
    else if(this.props.bottomRight){
      return stylesC.colEnd;
    }
    else{
      return stylesC.colCenter;
    }
  };
  getVerticalStyle=()=>{
    if(this.props.topLeft){
      return stylesC.colTop;
    }
    else if(this.props.topCenter){
      return stylesC.colTop;
    }
    else if(this.props.topRight){
      return stylesC.colTop;
    }
    else if(this.props.middleLeft){
      return stylesC.colMiddle;
    }
    else if(this.props.center){
      return stylesC.colMiddle;
    }
    else if(this.props.middleRight){
      return stylesC.colMiddle;
    }
    else if(this.props.bottomLeft){
      return stylesC.colBottom;
    }
    else if(this.props.bottomCenter){
      return stylesC.colBottom;
    }
    else if(this.props.bottomRight){
      return stylesC.colBottom;
    }
    else if(this.props.spaceBetween){
      return stylesC.colSpaceBetween;
    }
    else if(this.props.spaceAround){
      return stylesC.colSpaceAround;
    }
    else if(this.props.spaceEvenly){
      return stylesC.colSpaceEvenly;
    }
    else{
      return stylesC.colMiddle;
    }
  };
  render(){
    return <View ref={c=>(this._root=c)} style={[stylesC.listLeft,this.getHorizontalStyle(),this.getVerticalStyle(),this.props.border?stylesC.borderOnly:null,this.props.extraStyle]}  {...this.props} />;
  }
}

export class Center extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  getHorizontalStyle=()=>{
    if(this.props.stretch){
      return stylesC.colStretch;
    }
    else if(this.props.topLeft){
      return stylesC.colStart;
    }
    else if(this.props.middleLeft){
      return stylesC.colStart;
    }
    else if(this.props.bottomLeft){
      return stylesC.colStart;
    }
    else if(this.props.topCenter){
      return stylesC.colCenter;
    }
    else if(this.props.center){
      return stylesC.colCenter;
    }
    else if(this.props.bottomCenter){
      return stylesC.colCenter;
    }
    else if(this.props.topRight){
      return stylesC.colEnd;
    }
    else if(this.props.middleRight){
      return stylesC.colEnd;
    }
    else if(this.props.bottomRight){
      return stylesC.colEnd;
    }
    else{
      return stylesC.colStart;
    }
  };
  getVerticalStyle=()=>{
    if(this.props.topLeft){
      return stylesC.colTop;
    }
    else if(this.props.topCenter){
      return stylesC.colTop;
    }
    else if(this.props.topRight){
      return stylesC.colTop;
    }
    else if(this.props.middleLeft){
      return stylesC.colMiddle;
    }
    else if(this.props.center){
      return stylesC.colMiddle;
    }
    else if(this.props.middleRight){
      return stylesC.colMiddle;
    }
    else if(this.props.bottomLeft){
      return stylesC.colBottom;
    }
    else if(this.props.bottomCenter){
      return stylesC.colBottom;
    }
    else if(this.props.bottomRight){
      return stylesC.colBottom;
    }
    else if(this.props.spaceBetween){
      return stylesC.colSpaceBetween;
    }
    else if(this.props.spaceAround){
      return stylesC.colSpaceAround;
    }
    else if(this.props.spaceEvenly){
      return stylesC.colSpaceEvenly;
    }
    else{
      return stylesC.colMiddle;
    }
  };
  render(){
    return <View ref={c=>(this._root=c)} style={[stylesC.listCenter,this.getHorizontalStyle(),this.getVerticalStyle(),this.props.border?stylesC.borderOnly:null,this.props.extraStyle]}  {...this.props} />;
  }
}

export class End extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  getHorizontalStyle=()=>{
    if(this.props.stretch){
      return stylesC.colStretch;
    }
    else if(this.props.topLeft){
      return stylesC.colStart;
    }
    else if(this.props.middleLeft){
      return stylesC.colStart;
    }
    else if(this.props.bottomLeft){
      return stylesC.colStart;
    }
    else if(this.props.topCenter){
      return stylesC.colCenter;
    }
    else if(this.props.center){
      return stylesC.colCenter;
    }
    else if(this.props.bottomCenter){
      return stylesC.colCenter;
    }
    else if(this.props.topRight){
      return stylesC.colEnd;
    }
    else if(this.props.middleRight){
      return stylesC.colEnd;
    }
    else if(this.props.bottomRight){
      return stylesC.colEnd;
    }
    else{
      return stylesC.colCenter;
    }
  };
  getVerticalStyle=()=>{
    if(this.props.topLeft){
      return stylesC.colTop;
    }
    else if(this.props.topCenter){
      return stylesC.colTop;
    }
    else if(this.props.topRight){
      return stylesC.colTop;
    }
    else if(this.props.middleLeft){
      return stylesC.colMiddle;
    }
    else if(this.props.center){
      return stylesC.colMiddle;
    }
    else if(this.props.middleRight){
      return stylesC.colMiddle;
    }
    else if(this.props.bottomLeft){
      return stylesC.colBottom;
    }
    else if(this.props.bottomCenter){
      return stylesC.colBottom;
    }
    else if(this.props.bottomRight){
      return stylesC.colBottom;
    }
    else if(this.props.spaceBetween){
      return stylesC.colSpaceBetween;
    }
    else if(this.props.spaceAround){
      return stylesC.colSpaceAround;
    }
    else if(this.props.spaceEvenly){
      return stylesC.colSpaceEvenly;
    }
    else{
      return stylesC.colMiddle;
    }
  };
  render(){
    return <View ref={c=>(this._root=c)} style={[stylesC.listRight,this.getHorizontalStyle(),this.getVerticalStyle(),this.props.border?stylesC.borderOnly:null,this.props.extraStyle]}  {...this.props} />;
  }
}

export class GridItem extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  render(){
    return (
      <TouchableOpacity
        style={this.props.containerStyle}
        activeOpacity={this.props.activeOpacity}
        onPress={()=>{
          this.props.onPress();
        }}>
        <View style={this.props.parentStyle}>
          {this.props.top}
          {this.props.bottom}
        </View>
      </TouchableOpacity>
    );
  }
}

export class PopupCustom extends React.Component {
  constructor(props){
    super(props);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.visible === nextProps.visible) {
  //     return false;
  //   }
  //   return true;
  // }
  render(){
    return (
      <Modal
        animationType={this.props.animationType}
        transparent={this.props.transparent}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}>
        <View style={[stylesC.popupMain]}>
          <TouchableWithoutFeedback onPress={this.props.onPressOutside}>
            <View style={[stylesC.popupOutsideArea]} />
          </TouchableWithoutFeedback>
          <View style={this.props.containerStyle}>
           <View style={this.props.titleBarStyle}>
             <Text style={this.props.titleStyle}>
               {this.props.title}
             </Text>
           </View>
           {this.props.body}
           {this.props.buttons}
          </View>
        </View>
      </Modal>
    );
  }
}

export class Loader extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.animating === nextProps.animating) {
      return false;
    }
    return true;
  }
  render(){
    return (
      <View style={this.props.containerStyle}>
        <ActivityIndicator // react-native
          animating={this.props.animating}
          size={loaderSize}
          color={Colors.loaderColor} />
      </View>
    );
  }
}

export class Badge extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.text === nextProps.text) {
      return false;
    }
    return true;
  }
  render(){
    return (
      <View style={this.props.style}>
        <Text style={this.props.textStyle}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

export class Line extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render(){
    return (
      <View style={this.props.style}/>
    );
  }
}

export class Row extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  getHorizontalStyle=()=>{
    if(this.props.topLeft){
      return stylesC.rowStart;
    }
    else if(this.props.middleLeft){
      return stylesC.rowStart;
    }
    else if(this.props.bottomLeft){
      return stylesC.rowStart;
    }
    else if(this.props.topCenter){
      return stylesC.rowCenter;
    }
    else if(this.props.center){
      return stylesC.rowCenter;
    }
    else if(this.props.bottomCenter){
      return stylesC.rowCenter;
    }
    else if(this.props.topRight){
      return stylesC.rowEnd;
    }
    else if(this.props.middleRight){
      return stylesC.rowEnd;
    }
    else if(this.props.bottomRight){
      return stylesC.rowEnd;
    }
    else if(this.props.spaceBetween){
      return stylesC.rowSpaceBetween;
    }
    else if(this.props.spaceEvenly){
      return stylesC.rowSpaceEvenly;
    }
    else if(this.props.spaceAround){
      return stylesC.rowSpaceAround;
    }
    else{
      return stylesC.rowStart;
    }
  };
  getVerticalStyle=()=>{
    if(this.props.stretch){
      return stylesC.rowStretch;
    }
    else if(this.props.topLeft){
      return stylesC.rowTop;
    }
    else if(this.props.topCenter){
      return stylesC.rowTop;
    }
    else if(this.props.topRight){
      return stylesC.rowTop;
    }
    else if(this.props.middleLeft){
      return stylesC.rowMiddle;
    }
    else if(this.props.center){
      return stylesC.rowMiddle;
    }
    else if(this.props.middleRight){
      return stylesC.rowMiddle;
    }
    else if(this.props.bottomLeft){
      return stylesC.rowBottom;
    }
    else if(this.props.bottomCenter){
      return stylesC.rowBottom;
    }
    else if(this.props.bottomRight){
      return stylesC.rowBottom;
    }
    else{
      return stylesC.rowMiddle;
    }
  };
  render(){
    return <View ref={c=>(this._root=c)} style={[this.getHorizontalStyle(), this.getVerticalStyle(), this.props.border?stylesC.borderOnly:null ,this.props.extraStyle]}  {...this.props} />;
  }
}

export class Col extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  getHorizontalStyle=()=>{
    if(this.props.stretch){
      return stylesC.colStretch;
    }
    else if(this.props.topLeft){
      return stylesC.colStart;
    }
    else if(this.props.middleLeft){
      return stylesC.colStart;
    }
    else if(this.props.bottomLeft){
      return stylesC.colStart;
    }
    else if(this.props.topCenter){
      return stylesC.colCenter;
    }
    else if(this.props.center){
      return stylesC.colCenter;
    }
    else if(this.props.bottomCenter){
      return stylesC.colCenter;
    }
    else if(this.props.topRight){
      return stylesC.colEnd;
    }
    else if(this.props.middleRight){
      return stylesC.colEnd;
    }
    else if(this.props.bottomRight){
      return stylesC.colEnd;
    }
    else{
      return stylesC.colStart;
    }
  };
  getVerticalStyle=()=>{
    if(this.props.topLeft){
      return stylesC.colTop;
    }
    else if(this.props.topCenter){
      return stylesC.colTop;
    }
    else if(this.props.topRight){
      return stylesC.colTop;
    }
    else if(this.props.middleLeft){
      return stylesC.colMiddle;
    }
    else if(this.props.center){
      return stylesC.colMiddle;
    }
    else if(this.props.middleRight){
      return stylesC.colMiddle;
    }
    else if(this.props.bottomLeft){
      return stylesC.colBottom;
    }
    else if(this.props.bottomCenter){
      return stylesC.colBottom;
    }
    else if(this.props.bottomRight){
      return stylesC.colBottom;
    }
    else if(this.props.spaceBetween){
      return stylesC.colSpaceBetween;
    }
    else if(this.props.spaceAround){
      return stylesC.colSpaceAround;
    }
    else if(this.props.spaceEvenly){
      return stylesC.colSpaceEvenly;
    }
    else{
      return stylesC.colTop;
    }
  };
  render(){
    return <View ref={c=>(this._root=c)} style={[this.getHorizontalStyle(),this.getVerticalStyle(),this.props.border?stylesC.borderOnly:null,this.props.extraStyle]}  {...this.props} />;
  }
}

export class Box extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  render(){
    if(this.props.shadow)
      return <Card ref={c=>(this._root=c)} style={this.props.extraStyle} {...this.props}/>;
    else
      return <Col ref={c=>(this._root=c)} {...this.props}/>;
  }
}

export class PhotoSource extends React.Component {
  constructor(props){
    super(props);
  }

  state = {
    visible:false
  };

  showPopup = ()=>{
    this.setState({visible:true});
  };

  hidePopup = ()=>{
    this.setState({visible:false});
  };

  render(){
    return (
      <PopupCustom
        animationType="fade"
        transparent={true}
        visible={this.state.visible}
        onRequestClose={this.hidePopup}
        onPressOutside={this.hidePopup}
        containerStyle={[stylesC.popupContent,{height:200}]}
        titleBarStyle={[stylesC.button50,{backgroundColor:Colors.themeDark,borderRadius:0}]}
        titleStyle={[stylesC.textL18,{color:'white'}]}
        title={this.props.title}
        body={
          <View style={[stylesC.center,stylesC.flex1]}>
            <Button
              label={this.props.cameraLabel}
              activeOpacity={0.6}
              buttonStyle={[stylesC.button45,{marginTop:0,marginHorizontal:20}]}
              labelStyle={[stylesC.buttonT16,{color:'white'}]}
              onPress={()=>{
                this.hidePopup();
                this.props.onCameraSelect();
              }}/>
            <Button
              label={this.props.galleryLabel}
              activeOpacity={0.6}
              buttonStyle={[stylesC.button45,{marginTop:10,marginHorizontal:20}]}
              labelStyle={[stylesC.buttonT16,{color:'white'}]}
              onPress={()=>{
                this.hidePopup();
                this.props.onGallerySelect();
              }}/>
          </View>
        }/>
    );
  }
}
