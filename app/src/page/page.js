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

        this.categorySelectFromMain = this.categorySelectFromMain.bind(this);
    }
    
    componentWillMount(){
        this.mainRef = React.createRef();
    }
    componentDidUpdate(){
    }

    categorySelectFromMain(cateId){
        this.callSubCategories(cateId);
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
                    callSubCategoriesRef = {ref => {this.callSubCategories = ref}}
                />
                <Main 
                    mainRef = { this.mainRef } 
                    currentCate = {currentCate}
                    categorySelectFromMain = {this.categorySelectFromMain}
                />
            </div>
        );
    }
}

export default Page;

