const {
    REACT_APP_HESTIA_GIT_TAG,
    REACT_APP_HESTIA_GIT_COMMIT,
    REACT_APP_HESTIA_GIT_BRANCH,
    REACT_APP_HESTIA_BUILD_INFO,
    REACT_APP_HESTIA_BUILD_TIME
} = process.env;

console.log(
    `Hestia release %c${REACT_APP_HESTIA_GIT_TAG}\n%c(%c${REACT_APP_HESTIA_GIT_COMMIT}%c@%c${REACT_APP_HESTIA_GIT_BRANCH})`,
    'color: green',
    'color: none',
    'color: #D500F9',
    'color: red',
    'color: #1A237E'
);

const BUILD_INFO = REACT_APP_HESTIA_BUILD_INFO.split('[');

console.log(`Built by %c${BUILD_INFO[0]}%c[${BUILD_INFO[1]}`, 'color: #8E24AA', 'color: #1B5E20');
console.log(`Built on %c${REACT_APP_HESTIA_BUILD_TIME}`, 'color: #FFB300');

if (process.env.NODE_ENV === 'development')
    console.log('%cYou are probably running on a development build.', 'color : red');
else console.log('%cThis is an optimized production build - good!', 'color: green');
