import React, {Component} from 'react';
import Sidebar from '../components/sidebar';
import Main from '../components/main';

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

    // If user clicks one of the parent categories from the list of categories
    // on top of the inventory table, this function is triggered.
    // PARAM    : Category id selected
    categorySelectFromMain(cateId){
        // Call the function that changes current category in Sidebar component.
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

