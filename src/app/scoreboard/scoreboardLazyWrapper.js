import React, { Suspense } from 'react';
import { LoadingIndicator, ScoreboardError } from './scoreboardLazyAssistance.js';

const Scoreboard = React.lazy(() => import('./scoreboardWrapper.js'));

export default props => (
    <ScoreboardError>
        <Suspense fallback={<LoadingIndicator />}>
            <Scoreboard {...props} />
        </Suspense>
    </ScoreboardError>
);
