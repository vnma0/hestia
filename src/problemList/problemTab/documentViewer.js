import React from 'react';
import { Document, Page } from 'react-Pdf';


class Pdf extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: 1,
            totalPage:null
        }
    }
    onSuccessfulLoad = ({totalPage}) =>{
        this.setState({totalPage})
    }
    render() {
        const {currentPage,totalPage} = this.state;
        return(
            <>
            <Document
                file={this.props.path}
                onLoadSuccess={this.onDocumentLoadSuccess}
            >
                <Page pageNumber={currentPage} />
            </Document>
            <h2>Page {currentPage} of {totalPage} page{totalPage>1?"s":""}</h2>
            </>
        )
    }
}
//sample path
Pdf.defaultProps = { path:'./Sample Document/sample.Pdf'};

export default Pdf;