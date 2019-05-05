import React, {Component} from 'react';
import Sidebar from '../components/sidebar';
import Main from '../components/main';
import { getAllCategories } from '../controllers/controller';
class Page extends Component {

    constructor(props) {
        super(props);

        this.mainRef = React.createRef();
        getAllCategories();
    }

    render() {
        return (
            <div className="app-layout">
                <Sidebar mainRef = { this.mainRef }/>
                <Main mainRef = { this.mainRef }/>
            </div>
        );
    }
}

export default Page;

