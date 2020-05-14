import {Linking,Platform,Share} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

const Utils = {

  placeCall: (phone)=>{
    let url = '';
    if (Platform.OS === 'android') {
      url = `tel:${phone}`;
    }
    else {
      url = `telprompt:${phone}`;
    }
    Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url)
          .catch(() => null);
      }
    });
  },

  openEmail: (email)=>{
    Linking.openURL('mailto:'+email);
  },

  getBigNumber: (number)=>{
    let s = "";
    let n = 0;
    if(number < 1000){
        return ""+number;
    }
    else if(number >= 1000 && number < 1000000) {
        s = "" + (number / 1000) + "K";
        n = number % 1000;
        if(n == 0)
            return s;
        return n + s;
    }
    else{
        s = "" + (number / 1000000) + "M";
        n = number % 1000000;
        if(n == 0)
            return s;
        return n + s;
    }
  },

  round: (value, ndec)=>{
    var n = 10;
    for(var i = 1; i < ndec; i++){
        n *=10;
    }
    if(!ndec || ndec <= 0)
        return Math.round(value);
    else
        return Math.round(value * n) / n;
  },

  checkName: (name)=>{
    let nameReg = /^[a-zA-Z]*$/;
    return nameReg.test(name.replace(' ',''));
  },

  checkEmail: (email)=>{
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailReg.test(email);
  },

  moveToScreen: (navigation, stackName, routeName)=>{
    navigation.navigate(stackName, {}, NavigationActions.navigate({routeName: routeName}))
  },

  moveToAnotherStack: (navigation, routeName)=>{
    navigation.dispatch(StackActions.reset({
         index: 0,
         key: null,
         actions: [
              NavigationActions.navigate({routeName: routeName})
         ],
    }));
  },

  onShare: async (title, msg) => {
    try {
      const result = await Share.share({
        dialogTitle:title,
        title:title,
        message:msg,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        }
        else {
          // shared
        }
      }
      else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    }
    catch (error) {
      //alert(error.message);
    }
  },

  arrayAddItem: (models, item) => {
    return models.concat(item);
  },

  formatPhone: (text) => {
    var cleaned = ('' + text).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        var intlCode = (match[1] ? '+1 ' : ''),
            number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        return number;
    }
    return text;
  },

  // Note: mode.name search
  filterItems: (query, models)=>{
    if(query === '') {
      return models;
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    let list = models.filter(model => model.name.search(regex) >= 0);
    // if(list.length > 3){
    //   return [list[0], list[1], list[2]];
    // }
    return list;
  },

  randomFixedNumber: (length) => {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
  },

  getTimeAgo: (millis)=>{
    let currentTime = Math.round((new Date()).getTime());
    let seconds = (currentTime - millis)/1000;
    if (seconds < 60) {
      return parseInt(seconds) + "s ago";
    } else if (seconds < 3600) {
        return "" + parseInt(seconds / 60) + "m ago";
    } else if (seconds < 86400) {
        return "" + parseInt(seconds / 3600) + "h ago";
    } else if (seconds < 604800) {
        return "" + parseInt(seconds / 86400) + "d ago";
    } else if (seconds < 2419200){
        return "" + parseInt(seconds / 604800) + "w ago";
    } else if(seconds < 29030400){
        return "" + parseInt(seconds / 2419200) + "M ago";
    } else {
        return "" + parseInt(seconds / 29030400) + "Y ago";
    }
  },

}

export default Utils
