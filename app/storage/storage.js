import AsyncStorage from '@react-native-community/async-storage';

const MyStorage = {
  
  setFirstOpen: async (val) => {
    try {
      await AsyncStorage.setItem('firstOpen6', val)
    } catch (e) {
      // saving error
    }
  },
  isFirstOpen: async () => {
    try {
      const value = await AsyncStorage.getItem('firstOpen6')
      return value!==null? value : 'true';
    } catch(e) {
      return 'true';
    }
  },

  setLanguage: async (val) => {
    try {
      await AsyncStorage.setItem('language', val)
    } catch (e) {
      // saving error
    }
  },
  getLanguage: async () => {
    try {
      const value = await AsyncStorage.getItem('language')
      return value!==null? value : 'en';
    } catch(e) {
      return 'en';
    }
  },

}

export default MyStorage;
