import React, {Component} from 'react';
import Category from './category';

class Sidebar extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: "CATEGORY",
        }
    }

    render() {
        const {title} = this.state;

        return (
            <div className="sidebar">
                <div className="sidebar-title">
                    <h1>{title}</h1>
                    <span className="sidebar-title-border"></span>
                </div>
                <div className="sidebar-contents">
                    <div className="sidebar-category"><Category/></div>
                    <div className="sidebar-category"><Category/></div>

                </div>
            </div>
        );
    }
}

export default Sidebar;