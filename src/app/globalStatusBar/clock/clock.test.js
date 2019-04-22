import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock.js';
import LocalizedMessage, { LocalizationProvider } from 'react-l10n';
import { translations, supportedLanguages } from '../../../l10n-loader.js';

for (let language in supportedLanguages) {
    test(`Clock renders properly in ${language} (contest in progress)`, () => {
        let a = new Date();
        let b = new Date(a.setYear(a.getFullYear() + 1));

        // check for contest state setting
        let workspace = document.createElement('div');
        ReactDOM.render(
            <LocalizationProvider resources={translations[language].resources}>
                <Clock time={{ start: a, end: b }} />
            </LocalizationProvider>,
            workspace
        );
        expect(workspace.querySelector('#clock').className).toBe('clock-inprogress');

        // check for l10n runs properly
        let l10n_initial = document.createElement('div');
        ReactDOM.render(
            <LocalizationProvider resources={translations[language].resources}>
                <LocalizedMessage id='globalStatusBar.clock.timeLeft' />
            </LocalizationProvider>,
            l10n_initial
        );

        expect(workspace.querySelector('#clock').outerHTML).toBe(l10n_initial.outerHTML);
    });
}

for (let language in supportedLanguages) {
    test(`Clock renders properly in ${language} (contest ended)`, () => {
        let a = new Date();
        let b = new Date(a.setYear(a.getFullYear() - 1));

        let workspace = document.createElement('div');
        ReactDOM.render(
            <LocalizationProvider resources={translations[language].resources}>
                <Clock time={{ start: b, end: a }} />
            </LocalizationProvider>,
            workspace
        );

        expect(workspace.querySelector('#clock').className === 'clock-ended');

        let l10n_initial = document.createElement('div');
        ReactDOM.render(
            <LocalizationProvider resources={translations[language].resources}>
                <LocalizedMessage id='globalStatusBar.clock.timeLeft' />
            </LocalizationProvider>,
            l10n_initial
        );
        expect(workspace.querySelector('#clock').outerHTML).toBe(l10n_initial.outerHTML);
    });
}
