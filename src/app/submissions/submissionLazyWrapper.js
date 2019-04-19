import React, { Suspense } from 'react';
import { LoadingIndicator, SubmissionError } from './submissionLazyAssistance.js';

const Submissions = React.lazy(() => import('./submissionWrapper.js'));

export default props => (
    <SubmissionError>
        <Suspense fallback={<LoadingIndicator />}>
            <Submissions {...props} />
        </Suspense>
    </SubmissionError>
);
