import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import GlobalStatusBar from './globalStatusBar/globalStatusBar.js';
import ProblemTabEditor from './problemList/problemTabEditor';
import CodeBox from './problemList/codeEditor/codeBox.js'

ReactDOM.render(<><GlobalStatusBar contestName="Kỳ thi 1" currentUser="Test User"
                contestTimeLeft="00:00:00"
                contestDuration="23:59:59" loggedIn={true}/>
                <CodeBox/>
                </>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
