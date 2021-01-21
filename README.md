# Drawing-Chart

This is an app made by using express. The app gives chart of an equation.

#

## About this project

Making a server using express, ejs for making views.

#

## Future works on this project.

- Work on app to works with exponential function, logarithmic function and many others.
- Make the canvas to have scaling with zooming out or zooming in, instead of giving a number to each axis.
- Make the Line chart to works properly on Infinity outputs.
- Works on how to change the speed during the chart is being drawn.
- Make the app to work on other variable name, not just 'x'.

#

## Link to the app

#### [https://drawing-chart.herokuapp.com/](https://drawing-chart.herokuapp.com/){:target="\_blank"}

#

## Steps to make the server

### installing

- `npm init -y` : to have node.js
- `npm install express` : to have express
- `npm install ejs`: to have ejs files to make views
- making a directory named `views` as a part of express configuration
- `touch server.js`: the javascript file which contain all the command to make a server.
- making a directory named `public` and inside it, make a `style.css` and `index.js`.
- `index.js` contains all different functions that the server need when have a specific request.

### server.js

- all the commands that a server need to tackle with a request has been written.
- a port has been defined.
- different get requests for having different results on different requests.

### index.js

- `eqSplit` function: to take the equation string, split it, join all the numbers which they are
  next to each other. And it is going to find if there are any trigonometry function or not, using
  `trigonometry` function.
- `calculationPriority` function: to take an array (the splited equation) and according to the action, it is going to do an action.
- `eq` function: to do the calculation according to their priority. Parentheses, trigonometry functions, power, multiplication/division (from left to right) and sum/subtract.
- `outputEq` function: to make a legend for our charts.
- `draw` function: according to all the inputs, this function will give us outputs for each x. Using
  setInterval gives result in a specified time period.
- Making the `canvas` to have a responsive size.
- Making an event on clicking the button. By clicking the button, all functions gonna work to give us the results.

#

## Techs and libraries

- javascript
- Node.js
- nodemon
- express
- ejs
- heroku
