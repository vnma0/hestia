import React from 'react';
import { Dialog, DialogActions, DialogTitle, Button, DialogContent, DialogContentText, Grid } from '@material-ui/core';
import { slideIn } from '../globalStatusBar/lib/libTransition.js';

import Logo from './public.png'
import './about.css'

import BuildTag from './buildTag/buildTag.js';

export let toggleAbout;

class Info extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen : false
        }

        toggleAbout = this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({ dialogOpen: !this.state.dialogOpen })
    }

    render() {
        return (
            <>
                <Dialog open={this.state.dialogOpen} onClose={this.toggle}
                    TransitionComponent={slideIn} maxWidth="md" >
                    <DialogTitle>
                        About us
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={24}>
                            <Grid item>
                                <img src={Logo} alt=""/>
                            </Grid>
                            <Grid item>
                                <DialogContentText>
                                    Hestia
                                    {process.env.NODE_ENV === 'production' 
                                        ?
                                        <>, version&nbsp;
                                            <span className="code">
                                                {process.env.REACT_APP_HESTIA_VERSION}
                                            </span>
                                        </>
                                        : <>
                                            , commit&nbsp;
                                            <a className="code" style={{ textDecoration: 'none' }}
                                                href={`https://github.com/vnma0/hestia/commit/${process.env.REACT_APP_HESTIA_COMMIT}`}>
                                                {process.env.REACT_APP_HESTIA_COMMIT}
                                            </a>
                                        </>}
                                </ DialogContentText>
                                <DialogContentText>
                                    Wafter
                                    {process.env.NODE_ENV === 'production' 
                                        ?
                                        <>, version&nbsp;
                                            <span className="code">
                                                {process.env.REACT_APP_WAFTER_VERSION}
                                            </span>
                                        </>
                                        : <>
                                            , commit&nbsp;
                                            <a className="code" style={{ textDecoration: 'none' }}
                                                href={`https://github.com/vnma0/wafter/commit/${process.env.REACT_APP_HESTIA_COMMIT}`}>
                                                {process.env.REACT_APP_WAFTER_COMMIT}
                                            </a>
                                        </>}
                                </ DialogContentText>
                            </Grid>
                        </Grid>
                        <BuildTag />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggle}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

export default Info