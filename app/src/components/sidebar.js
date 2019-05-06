import React, {Component} from 'react';
import _ from 'lodash';
import classnames from 'classnames';

import Category from './category';
import { getAllCategories } from '../controllers/controller'

import {collapsing, reverse} from '../helpers/collapsing';

class Sidebar extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: "Inventory",
            categories:[],
            currentSubCate:[],
            currentCate:null,
            isCollapsed: false,
            
        }

        this.initCategories = this.initCategories.bind(this);
        this.callSubCategories = this.callSubCategories.bind(this);
        this._setCurrentSubCate = this._setCurrentSubCate.bind(this);
        /* this._collapsing = this._collapsing.bind(this);
        this._reverse = this._reverse.bind(this); */
    }

    componentWillMount(){
        this.props.callSubCategoriesRef(this.callSubCategories);
    }

    componentDidMount() {
        this.initCategories();
        this.sidbarRef = React.createRef();
    }

    initCategories() {
        getAllCategories((data) => {
            this.setState({
                categories:data
            }, () => {
                this._setCurrentSubCate();
            });
        })
    }

    _setCurrentSubCate(){
        const {categories} = this.state;
        let current = [];

        for(let i = 0; i < categories.length; i++) {
            categories[i]["hasSub"] = false;
            if(!categories[i].parent){
                    current.push(categories[i])
            } else {
                let id = categories[i].parent.cateId;
                let parentCate = _.find(categories, {cateId:id});
                parentCate["hasSub"] = true;
                
            }
        }
        /* for(let i = 0; i < categories.length; i++) {
            categories[i]["hasSub"] = false;
            newCategories[categories[i].id] = categories[i]; 
            //if(!categories[i].parent){
            if(_.get(categories,'[i].parent.cateId',true)){
                current[categories[i].id] = categories[i];
                current.push()
            } else {
                //newCategories[categories[i].parent.cateId].hasSub = true;
                categories[i]["hasSub"] = false;
                //categories[(categories[i].parent -1)].hasSub = true;
            }
        } */
        this.setState({
            currentSubCate: current,
            categories: categories,
        }, ()=>{

        });
    }

    callSubCategories(parentId = null) {
        const {categories} = this.state;
        let subs = [];
        
        for(let i = 0; i < categories.length; i++){
            let pid = _.get(categories, "[i].parent.cateId");
            if(categories[i].parent){
                if(categories[i].parent.cateId == parentId){
                    subs.push(categories[i]);    
                }
            } else if (parentId == null) {
                subs.push(categories[i]);
            }
            /* if(pid == parentId){
                subs.push(categories[i]);
            } */
        }
        /* for(let category in categories){
            let pid = category.parent.cateId;
            //let pid = _.get(categories, '[key].parent');
            if(pid == parentId){
                //subs[key] = categories[key];
                subs.push(category);
            }
        } */
        /* for(let i = 0; i < categories.length; i++) {
            let pid = categories[i].parent;
            if(pid == parent){
                subs.push(categories[i]);
            }
        } */
        //let title = _.get(categories,`[${parentId}].name`) ? categories[parentId].name : "Inventory";
        let title = _.find(categories,{cateId:parentId}) ? (_.find(categories,{cateId:parentId})).name : "Inventory";
        let currentCate = _.find(categories, {cateId:parentId});
        //console.log(subs);
        this.setState({
            title: title,
            currentSubCate: subs,
            currentCate: currentCate,
        }, () =>{
            this.props.onchange(this.state.currentCate);
        });

    }
    

    render() {
        const {title, currentSubCate, currentCate, isCollapsed, categories} = this.state;

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
                                //this.callSubCategories(this.state.categories[currentCateId].parent.cateId)} 
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