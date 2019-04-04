import React from "react";
import { AppBar, Grid, Divider } from "@material-ui/core";

import CodeEditor from "./codeEditor.js";
import SubmitButton from "./submitButton.js";
import LangSelection from "./langSelection.js";
import UploadButton from "./uploadButton.js";

import { pushNotification } from "../../notifier/notify.js";

var reader = new FileReader();
class CodeBox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            langId: 0,
            submitting: false,
            fileLoading: false,
            editorHeight: window.innerHeight - 180
        };
        this.catcherRef = React.createRef();
        this.updateEditorHeight = this.updateEditorHeight.bind(this);
        this.processFile = this.processFile.bind(this);
        this.inputEventFire = this.inputEventFire.bind(this);
    }
    //Add listener to window resize
    componentDidMount() {
        this.updateEditorHeight();
        window.addEventListener("resize", this.updateEditorHeight);
    }
    //update editor height when resize window
    updateEditorHeight() {
        this.setState({
            editorHeight:
                window.innerHeight - this.refs.optionTab.clientHeight - document.getElementById("appBar").offsetHeight - 77.5
        });
    }

    inputEventFire() {
        this.catcherRef.current.click();
    }

    processFile(file) {
        if (!file instanceof Blob && !file instanceof File)
            if (typeof pushNotification === "function")
                // non-File input, hmm...
                return pushNotification("Invalid file supplied");
        reader.onload = () => {
            this.setState({
                code: reader.result,
                fileLoading: false
            });
        };
        reader.onloadstart = () => this.setState({ fileLoading: true });
        reader.readAsText(file);
    }

    render() {
        return (
            <>
                <Divider light variant="inset" />
                <AppBar
                    id="appBar"
                    position="static"
                    color="default"
                >
                    <div
                        ref="optionTab"
                        style={{ margin: "10px 10px", maxHeight: "100%" }}
                    >
                        <Grid container spacing={8} alignItems="center">
                            <Grid item>
                                <UploadButton
                                    onClick={this.inputEventFire}
                                    disabled={this.state.fileLoading}
                                    variant="contained"
                                />
                            </Grid>
                            <Grid item style={{ flexGrow: 1 }}>
                                <LangSelection
                                    ext={this.props.ext}
                                    choice={this.state.langId}
                                    handleChange={id =>
                                        this.setState({ langId: id })
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <SubmitButton
                                    disabled={
                                        this.state.code === "" ||
                                        this.state.langId === null ||
                                        this.props.ext.size === 0
                                    }
                                    fileName={this.props.submitFileName}
                                    code={this.state.code}
                                    ext={
                                        this.props.ext[this.state.langId] || ""
                                    }
                                    onSubmit={() =>
                                        this.setState({
                                            submitting: true
                                        })
                                    }
                                    onSubmitDone={() =>
                                        this.setState({
                                            submitting: false
                                        })
                                    }
                                >
                                    Submit
                                </SubmitButton>
                            </Grid>
                        </Grid>
                    </div>
                </AppBar>
                <div>
                    <CodeEditor
                        readOnly={
                            this.state.submitting || this.state.fileLoading
                        }
                        ext={this.props.ext[this.state.langId]}
                        update={code => this.setState({ code: code })}
                        code={this.state.code}
                        editorHeight={this.state.editorHeight}
                    />
                </div>
                <input
                    type="file"
                    onChange={event => this.processFile(event.target.files[0])}
                    ref={this.catcherRef}
                    style={{ display: "none" }}
                />
            </>
        );
    }
}

export default CodeBox;
