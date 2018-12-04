![Mighty Vision](https://i.ibb.co/N6xPGDH/1.png)



### Install

1. [Copy](https://github.com/mighty-vision/mighty-vision/archive/master.zip) repository
2. Run `npm i` at downloaded directory
3. Run `gulp` for development or `gulp prod` for production

---

### Basic structure

```shell
📁 Mighty Vision 
   📁 locales                    ⚪ Project text content 
   📁 src                        ⚪ All non-static resources
      📁 basic                   
      📁 components              
      📁 libs                    
      📁 utils                   
      📄 index.handlebars
      📄 index.js
      📄 index.scss
   📁 static                     ⚪ Images, videos, fonts etc.
   📁 dist                       ⚪ Assembled project. Will be generated after running project
   📁 .tmp                       ⚪ Will be generated after running project
   📄 gulpfile.js
   📄 package.json
```

---

### I18n and templating

You need to know that all templating and internationalization are static. So all `.handlebars` components [compiled](https://www.npmjs.com/package/gulp-compile-handlebars) during project building. Locales apply also [during building](https://github.com/filaraujo/gulp-i18n-localize)

---

### Continuous deployment

Project using netlify for CD. Just create any commit and after 1-2 minutes all project will rebuilded at https://mighty-vision.netlify.com

#### So, if you want change some content just go to [ru](https://github.com/mighty-vision/mighty-vision/edit/master/locales/ru/content.json) or [en](https://github.com/mighty-vision/mighty-vision/edit/master/locales/en/content.json) locales, change them and push changes directly on github.

---

### Please use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) for all commits at project
