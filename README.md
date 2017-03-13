npm install lazy-load-react

```js
import lazyme from 'lazy-load-react';

const HomePage = lazyme(() => System.import('./HomePage'));

<Route exact path="/" component={HomePage}/>
```


[example](https://github.com/JoV5/react-starter/tree/master/src/react-router)