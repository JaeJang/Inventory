import React, {Component} from 'react';
import _ from 'lodash';
import classnames from 'classnames';

import Category from './category';
import { getAllCategories } from '../controllers/controller'

import {collapsing, reverse} from '../helpers/collapsing';

class Sidebar extends Component {

    // Initialize the state and all functions
    constructor(props){
        super(props);
        this.state = {
            title: "Inventory",
            categories:[],
            currentSubCate:[],
            currentCate:null,
            isCollapsed: false,
            
        }

        this._initCategories = this._initCategories.bind(this);
        this.callSubCategories = this.callSubCategories.bind(this);
        this._setInitCurrentSubCate = this._setInitCurrentSubCate.bind(this);

    }

    componentWillMount(){
        // Create a reference of callSubCategories  so the parent component can call.
        this.props.callSubCategoriesRef(this.callSubCategories);
        // Initilaize categories to show.
        this._initCategories();
    }

    componentDidMount() {
        // Create a React DOM reference to style outside of render function.
        this.sidbarRef = React.createRef();
    }

    // Get all categories from DB and initialize.
    _initCategories() {

        // Retrieve data from DB.
        getAllCategories((data) => {
            /* this.setState({
                categories:data
            }, () => {
                this._setInitCurrentSubCate();
            }); */
            this._setInitCurrentSubCate(data);
        })
    }

    // Set the top categories as initial categories to show.
    // Check if a category has sub categories and mark.
    // PARAM    : Categories that will be used to set.
    _setInitCurrentSubCate(categories){
        //const {categories} = this.state;
        let current = [];
        console.log(categories);
        for(let i = 0; i < categories.length; i++) {
            // Initial state of a category is false which means that it doesn't have any child.
            categories[i]["hasSub"] = false;
            // If the category has no parent then it's a top category.
            if(!categories[i].parent){
                    // Push the category in the list of category to show .
                    current.push(categories[i])
            } else {
                // Get parents category id.
                let id = categories[i].parent.cateId;
                // Get the parent category object based on the id.
                let parentCate = _.find(categories, {cateId:id});
                // Mark as it has sub category.
                parentCate["hasSub"] = true;
                
            }
        }
        this.setState({
            currentSubCate: current,
            categories: categories,
        });
    }

    // Change categories to show in the basis of the passed category id.
    // PARAM    : Category id to be displayed.
    callSubCategories(parentId = null) {
        const {categories} = this.state;
        let subs = [];
        
        for(let i = 0; i < categories.length; i++){
            if(categories[i].parent){
                //if a category is a child of the parent we want to show.
                if(categories[i].parent.cateId == parentId){
                    subs.push(categories[i]);    
                }
            
            // If parentId has not been passed, get the top categories.
            } else if (parentId == null) {
                subs.push(categories[i]);
            }
        }
        // Get a name of the category.
        let title = _.find(categories,{cateId:parentId}) ? (_.find(categories,{cateId:parentId})).name : "Inventory";
        // Get the category that will be shown on the screen .
        let currentCate = _.find(categories, {cateId:parentId});
        this.setState({
            title: title,
            currentSubCate: subs,
            currentCate: currentCate,
        }, () =>{
            // Inform the parent component that the current category has been changed.
            this.props.onchange(this.state.currentCate);
        });

    }
    

    render() {
        const {title, currentSubCate, currentCate, isCollapsed} = this.state;

        return (
            <div className="sidebar" ref={this.sidbarRef}>
                <div className="sidebar-icons">

                    <span className="sidebar-icon" 
                          title = {isCollapsed ? "Show category bar" : "Hide category bar"}
                    >
                        <i className={ 
                            classnames({"icon-resize-small":!isCollapsed},
                                        {"icon-resize-full":isCollapsed})
                            }
                            onClick={
                                () => {
                                    !isCollapsed? collapsing(this) : reverse(this);    
                                } 
                            }    
                        />
                    </span>
                    <span 
                        className={ classnames("sidebar-icon", {"hide":isCollapsed})}
                        onClick = {() => { this.callSubCategories()} }
                        title="Top category"
                    >
                        <i className="icon-home"/>
                    </span>
                    
                    {
                        currentCate ? 
                        <span 
                            className={ classnames("sidebar-icon", {"hide":isCollapsed}) }
                            title = "Previous category"
                            onClick={ () => {
                                    this.callSubCategories(
                                        _.get(currentCate,"parent.cateId")
                                    )
                                    
                                }
                            }
                        >
                            <i className="icon-left"/>
                        </span> : null
                    }
                    
                </div>
                <div className={ classnames("sidebar-body",{"hide":isCollapsed})}>                
                    <div className="sidebar-title">
                        <h1>{title}</h1>
                        
                        <span className="sidebar-title-border"></span>
                    </div>
                    <div className="sidebar-contents">
                        {
                            
                            currentSubCate.length ? currentSubCate.map((value, index) => {
                                return <Category key={index} details={value} onclick={this.callSubCategories}/>
                            }) :null
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;