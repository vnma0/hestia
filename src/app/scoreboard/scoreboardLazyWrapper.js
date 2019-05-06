import React, { Suspense } from 'react';
import { LoadingIndicator, ScoreboardError } from './scoreboardLazyAssistance.js';

const Scoreboard = React.lazy(() =>
    import('./scoreboardWrapper.js').then(component => {
        console.log('Hestia : %cScoreboard %capplet has been successfully loaded!', 'color: green', 'color: none');
        return component;
    })
);

export default props => (
    <ScoreboardError>
        <Suspense fallback={<LoadingIndicator />}>
            <Scoreboard {...props} />
        </Suspense>
    </ScoreboardError>
);
