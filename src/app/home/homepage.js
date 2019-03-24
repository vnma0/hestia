import React from 'react'

export default class Homepage extends React.PureComponent {
    componentDidMount() {
        this.componentDidUpdate()
    }

    componentDidUpdate() {
        if (this.props.title) 
            document.title = String(this.props.title)
    }
    
    render() {
        return <React.Fragment />
    }
}