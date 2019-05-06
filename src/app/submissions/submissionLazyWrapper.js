import React, { Suspense } from 'react';
import { LoadingIndicator, SubmissionError } from './submissionLazyAssistance.js';

const Submissions = React.lazy(() =>
    import('./submissionWrapper.js').then(component => {
        console.log('Hestia : %cSubmissions %capplet has been successfully loaded!', 'color: green', 'color: none');
        return component;
    })
);

export default props => (
    <SubmissionError>
        <Suspense fallback={<LoadingIndicator />}>
            <Submissions {...props} />
        </Suspense>
    </SubmissionError>
);
