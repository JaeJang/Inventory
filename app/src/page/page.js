import React, {Component} from 'react';
import Sidebar from '../components/sidebar';
import Main from '../components/main';

class Page extends Component {
    render() {
        return (
            <div className="app-layout">
                <Sidebar/>
                <Main/>
            </div>
        );
    }
}

export default Page;

