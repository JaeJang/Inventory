import React, {Component} from 'react';
import _ from 'lodash';
import classnames from 'classnames';

import Category from './category';

import {collapsing, reverse} from '../helpers/collapsing';
import {SIDEBAR_WIDTH, COLLAPSED_SIDEBAT_WIDTH} from '../values/elementSize';

class Sidebar extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: "Inventory",
            categories:[],
            currentSubCate:[],
            currentCateId: null,
            isCollapsed: false,
            
        }

        this.initCategories = this.initCategories.bind(this);
        this.callSubCategories = this.callSubCategories.bind(this);
        this._setCurrentSubCate = this._setCurrentSubCate.bind(this);
        /* this._collapsing = this._collapsing.bind(this);
        this._reverse = this._reverse.bind(this); */
    }

    componentDidMount() {
        this.initCategories();
        this.sidbarRef = React.createRef();
    }

    initCategories() {
        this.setState({
            categories:[
                {
                    "id": 1,
                    "name": "Category 1",
                    "parent_id": 0,
                },
                {
                    "id": 2,
                    "name": "Category 2",
                    "parent_id": 0,
                },
                {
                    "id": 3,
                    "name": "Category 3",
                    "parent_id": 2,
                },
                {
                    "id": 4,
                    "name": "Category 4",
                    "parent_id": 2,
                },
                {
                    "id": 5,
                    "name": "Category 5",
                    "parent_id": 3,
                },{
                    "id": 6,
                    "name": "Category 6",
                    "parent_id": 5,
                },

            ],
            currentCateId: 0,
        },()=>{
            this._setCurrentSubCate();
        });
    }

    _setCurrentSubCate(){
        const {categories} = this.state;
        let current = {};
        let newCategories = {};
        for(let i = 0; i < categories.length; i++) {
            categories[i]["hasSub"] = false;
            newCategories[categories[i].id] = categories[i]; 
            if(!categories[i].parent_id){
                current[categories[i].id] = categories[i];
            } else {
                newCategories[categories[i].parent_id].hasSub = true;
                //categories[(categories[i].parent_id -1)].hasSub = true;
            }
        }
        this.setState({
            currentSubCate: current,
            categories: newCategories,
        }, ()=>{

        });
    }

    callSubCategories(parent_id=0) {
        const {categories, currentCateId} = this.state;
        let subs = {};
        for(let key in categories){
            let pid = categories[key].parent_id;
            if(pid == parent_id){
                subs[key] = categories[key];
            }
        }
        /* for(let i = 0; i < categories.length; i++) {
            let pid = categories[i].parent_id;
            if(pid == parent_id){
                subs.push(categories[i]);
            }
        } */
        let title = _.get(categories,`[${parent_id}].name`) ? categories[parent_id].name : "Inventory";
        this.setState({
            title: title,
            currentSubCate: subs,
            currentCateId: parent_id,
        }, () =>{

        });

    }
    

    render() {
        const {title, currentSubCate, currentCateId, isCollapsed} = this.state;

        return (
            <div className="sidebar" ref={this.sidbarRef}>
                <div className="sidebar-icons">

                    <span className="sidebar-icon">
                        <i className={ 
                            classnames({"icon-resize-small":!isCollapsed},
                                        {"icon-resize-full":isCollapsed})
                            }
                            onClick={
                                () => {
                                    !isCollapsed? collapsing(this) : reverse(this);    
                                } 
                                //!isCollapsed? ()=>{}this._collapsing : this._reverse
                            }    
                        />
                    </span>
                    <span 
                        className={ classnames("sidebar-icon", {"hide":isCollapsed})}
                        onClick = {() => { this.callSubCategories()} }
                    >
                        <i className="icon-home"/>
                    </span>
                    
                    {
                        currentCateId ? 
                        <span 
                            className={ classnames("sidebar-icon", {"hide":isCollapsed}) }
                            onClick={ () => {this.callSubCategories(this.state.categories[currentCateId].parent_id)} }
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
                            Object.keys(currentSubCate).length ? Object.keys(currentSubCate).map(key => {
                                {/* return value.hasSub ? 
                                    <Category key={index} details={value} onclick={this.callSubCategories}/>
                                    : <Category key={index} details={value}/> */}
                                return <Category key={key} details={currentSubCate[key]} onclick={this.callSubCategories}/>
                            }): null
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;



/*
_collapsing() {
        this.sidebar_width = SIDEBAR_WIDTH;
        this.mainRef_c = this.props.mainRef.current;
        this.sidebarRef_c = this.sidbarRef.current;

        if( this.mainRef_c.offsetLeft !== 0){
                
            this.timerSidebar = setInterval(()=>{
                
                this.sidebar_width -= 4;
                this.sidebarRef_c.style.width = this.sidebar_width + 'px';
                this.mainRef_c.style.marginLeft = this.sidebar_width + 'px';
                if(this.sidebarRef_c.offsetWidth == COLLAPSED_SIDEBAT_WIDTH){
                    clearInterval(this.timerSidebar);
                }
            }, 5);
        }
        this.setState({
            isCollapsed:true,
        }, () => {
            this.sidebarRef_c.style.width = COLLAPSED_SIDEBAT_WIDTH + 'px';
        });
    }
    _reverse() {
        this.sidebar_width = this.sidbarRef.current.offsetWidth;
        this.mainRef_c = this.props.mainRef.current;
        this.sidebarRef_c = this.sidbarRef.current;

        if( this.mainRef_c.offsetLeft !== 0){
                
            this.timerSidebar = setInterval(()=>{
                this.sidebar_width += 4;
                this.sidebarRef_c.style.width = this.sidebar_width + 'px';
                //if(this.mainRef.current.offsetLeft !== 0){
                    this.mainRef_c.style.marginLeft = this.sidebar_width + 'px';
    
                //}
                if(this.sidebarRef_c.offsetWidth == SIDEBAR_WIDTH){
                    clearInterval(this.timerSidebar);
                    this.setState({
                        isCollapsed:false,
                    });
                }
            }, 5);
        } else {
            this.setState({
                isCollapsed:false,
            }, () => {
                this.sidebarRef_c.style.width = SIDEBAR_WIDTH + 'px';
            });
        }
        
    }
*/