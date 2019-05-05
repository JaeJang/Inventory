import React, {Component} from 'react';
import Sidebar from '../components/sidebar';
import Main from '../components/main';
import { getAllCategories } from '../controllers/controller';
class Page extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentCate: null,
        }
    }
    
    componentDidMount(){
        this.mainRef = React.createRef();
    }
    componentDidUpdate(){
    }

    render() {
        const {currentCate} = this.state;

        return (
            <div className="app-layout">
                <Sidebar 
                    mainRef = { this.mainRef } 
                    onchange={ currentCate => {
                            this.setState({currentCate: currentCate})
                        }
                    }
                />
                <Main 
                    mainRef = { this.mainRef } 
                    currentCate = {currentCate}
                />
            </div>
        );
    }
}

export default Page;

