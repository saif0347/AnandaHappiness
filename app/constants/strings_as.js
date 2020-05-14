
export default class AppStringsAs {

    // App Texts - Can be modified
    // Note: Only values inside quotes should be changed and not the keys
    // Format >> key = value
    app_name = 'Ananda Happiness';
    app_info = 'এক জাগ্ৰত শিকন সমাজ';
    about_us = 'আমাৰ বিষয়ে';
    vp = 'ভি ডি আ  আৰম্ভ কৰা';
    cs = 'শুনকালে আহি আছে';
  
    static instance = null;
  
    static getInstance() {
        if (AppStringsAs.instance == null) {
          console.log('AppStrings new object');
          AppStringsAs.instance = new AppStringsAs();
        }
        return this.instance;
    }
  }
  