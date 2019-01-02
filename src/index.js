import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import GlobalStatusBar from './globalStatusBar/globalStatusBar.js';
import SubmissionTable from './submissions/submissionTable';

ReactDOM.render(<>
<GlobalStatusBar contestName="Kỳ thi 1" currentUser="Test User"
        contestTimeLeft="00:00:00"
        contestDuration="23:59:59" loggedIn={true}/>
                <SubmissionTable submissionList={[{
                    contestant : 'minhducsun123456', problem : 'A',
                    verdict : 'AC', executionTime: '00:00:123', memory : '1TB', submissionTimestamp: '00:00:00',
                    language : 'Perl',
                },{
                    contestant : 'minhducsun2002', problem : 'A',
                    verdict : 'WA', executionTime: '11:00:234', memory : '1TB', submissionTimestamp: '00:00:00',
                    language : 'Pascal',
                },{
                    contestant : 'minhducsun123456', problem : 'A',
                    verdict : 'AC', executionTime: '38:46:115', memory : '1TB', submissionTimestamp: '00:00:00',
                    language : 'C99',
                }]}/>
                </>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
