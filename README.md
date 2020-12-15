# Vue as an api consumer
by Max Vos

Vue is a javascript framework that makes it easier to show data fetched from an api at the page.
Vue lets you bind html tags to javascript data elements, in two ways. That means that you can change 
the data in javascript and it will reflect the change on the page in real time. And it lets the user change
values in the html which will be reflected in real time in the javascript. This would be very difficult to obtain yourself
in vanilla javascript. Besides that vue, like react, works with components which are little 
parts of you html, js and css all combined in one place. This makes you code modular.

This repository resembles the end of the tutorial. During the tutorial start with a stub, which you can find 
[here](https://github.com/MaxVos7/web-engineering-tutorial-stub), and work our way as 
far as we can to something that looks like this project. After my tutorial Bastiaan
will continue with my project as it is here, even if we do not succeed in getting that far.

You will find comments throughout the code that help you get a better understanding of what is happening.

For vue, like virtually every other js framework, you must have [nodejs](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) installed on your machine.
If you want to follow along with the tutorial you must do this before the start.

In order to include all the modules needed for vue must navigate to the project repo and enter the following command.
```
npm install
```

Now it's very easy to compile your code and view it in the browser. Enter the following command. By default hot reloading is enabled, this means that you 
do not have to refresh you browser to view your changes, this is done as soon as you save you edited file.
```
npm run serve
```
Once your application is ready for production you can run the following command. This will minify you files which helps with performance.
```
npm run build
```
