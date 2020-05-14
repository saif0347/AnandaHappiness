
export default class AppStrings {

  // App Texts - Can be modified
  // Note: Only values inside quotes should be changed and not the keys
  // Format >> key = value
  app_name = 'Ananda Happiness';
  app_info = 'A Mindful Learning Community';
  about_us = 'About Us';
  vp = 'Video Play';
  cs = 'Coming Soon...';

  static instance = null;

  static getInstance() {
      if (AppStrings.instance == null) {
        console.log('AppStrings new object');
        AppStrings.instance = new AppStrings();
      }
      return this.instance;
  }
}
