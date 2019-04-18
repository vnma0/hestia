import React from 'react';
import { RadioGroup, FormControlLabel, Radio, FormControl } from '@material-ui/core';

export default class LocaleChange extends React.PureComponent {
    render() {
        let out = [];
        for (let lang_key in this.props.languages) {
            out.push(
                <FormControlLabel
                    value={lang_key}
                    key={lang_key}
                    label={this.props.languages[lang_key]}
                    control={<Radio />}
                />
            );
        }
        return (
            <div style={{ marginTop: 10 }}>
                <FormControl component='fieldset'>
                    <RadioGroup value={this.props.choice} onChange={this.props.onChange}>
                        {out}
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}
