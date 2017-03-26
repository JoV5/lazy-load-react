### Preconditions
1. use webpack2
2. support Promise


### How
`npm install lazy-load-react`  

```js
import lazyme from 'lazy-load-react';

const HomePage = lazyme(() => System.import('./HomePage'));

<Route exact path="/" component={HomePage}/>
```


### Examples
[`react-router App`](https://github.com/JoV5/react-starter/blob/master/src/react-router/containers/App.js)

[`react-cnode App`](https://github.com/JoV5/react-cnode/blob/master/src/containers/App/index.js)