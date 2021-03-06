import React from 'react';
import { Slide, Zoom, Collapse, Fade, Grow } from '@material-ui/core';

const StandardTiming = { enter: 500, exit: 500 };

/**
 * @name libTransition
 * @desc Transition components, packed for inclusion as TransitionComponent.
 *       mountOnEnter is enabled.
 */

function slideIn(props, slideDirection) {
    /**
     * @author minhducsun2002
     */
    return <Slide direction={slideDirection || 'up'} mountOnEnter {...props} />;
    // by default the dialog slides upwards
}

function zoomIn(props) {
    /**
     * @author minhducsun2002
     * @desc This function is raw... should be wrapped in another function
     */
    return <Zoom timeout={StandardTiming} mountOnEnter {...props} />;
    // enter and exit in 0.5s
}

function fade(props) {
    /**
     * @author minhducsun2002
     * @desc This function is raw... should be wrapped in another function
     */
    return <Fade timeout={StandardTiming} mountOnEnter {...props} />;
    // enter and exit in 0.5s
}

function collapse(props) {
    /**
     * @author minhducsun2002
     * @desc This function is raw... should be wrapped in another function
     */
    return <Collapse timeout={StandardTiming} mountOnEnter {...props} />;
}

function grow(props) {
    /**
     * @author minhducsun2002
     * @desc This function is raw... should be wrapped in another function
     */
    return <Grow timeout={StandardTiming} mountOnEnter {...props} />;
}

export { slideIn, zoomIn, fade, collapse, grow };
