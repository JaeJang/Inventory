import React, {Component} from  'react';
import _ from 'lodash';

import { getInventory, deleteItem } from '../controllers/controller';

class Main extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            inventory: null,
            categoryList: [],
        }

        this._updateInventory = this._updateInventory.bind(this);
        this._updateCategoryList = this._updateCategoryList.bind(this);
        this._deleteItem =this._deleteItem.bind(this);
    }
    
    componentWillMount(){
        // Initialize the inventory state with the top categories
        this._updateInventory();
        // Update the category list state to be shown above the inventory table
        this._updateCategoryList(this.props.currentCate);
    }

    componentWillReceiveProps(nextProps){
        //If the current category has changed to another
        // then update the inventory and list according to the category
        if(this.props.currentCate !== nextProps.currentCate){
            const cateId = _.get(nextProps,'[currentCate].cateId');
            this._updateInventory(cateId);
            this._updateCategoryList(nextProps.currentCate);
        }
    }

    // Update the inventory state based on the passed category id
    // PARAM    : Category id to be used for importing inventory data
    _updateInventory(cateId) {
        // Get inventory data for a specific category from DB
        getInventory(data => {this.setState({inventory:data})}, cateId);
    }

    // Update the category list that will be shown above the inventory table
    // PARAM    : Current category 
    _updateCategoryList(currentCate){
        const categoryList = [];
        if(currentCate){
            let parent = currentCate;
            // Since a category object has information of its parent categories
            // it's possible to trace back and get all categories where it belongs
            while(parent){
                categoryList.unshift({name:parent.name, cateId:parent.cateId});    
                parent = parent.parent;
            }
        }
        categoryList.unshift({name:"All", cateId:null});
        this.setState({categoryList: categoryList});
    }

    // Delete the passed item 
    // PARAM    : Item to be deleted
    // PARAM    : Index from the inventory list
    _deleteItem(item, index) {
        // Ask your if they really want to delete
        let yes = window.confirm("Do you want to delete " + item.itemName + " item?");
        if(yes){
            deleteItem( isSuccess => {
                // If it has been deleted successfully from the database
                if(isSuccess){
                    // Remove the item from the list
                    let {inventory} = this.state;
                    inventory.splice(index, 1);
                    this.setState({inventory:inventory});
                }
            }, item.itemId);
        }
    }

    render() {

        const {inventory, categoryList} = this.state;

        return (
            <div className="contents" ref={ this.props.mainRef }>
                <div className="contents-title">
                    {
                        categoryList.length ? <div className="contents-title-cates">
                        {
                            categoryList.map((value,index) => {
                                return index !== categoryList.length-1 ?
                                    (<span key={index} className="cate previous" onClick={()=>{this.props.categorySelectFromMain(value.cateId)}}>{value.name} 
                                        <i className={'icon-right-open'}/>
                                    </span>)
                                    :(<span key={index} className="cate">{value.name}</span>);
                            })
                        }
                        </div> : null
                    }   
                </div>
                <table>
                    <thead>
                        <tr className="label">
                            <th>Product name</th>
                            <th>Quantity</th>
                            <th>Unit price</th>
                            <th></th>
                        </tr>
                    </thead>
                    {
                        inventory && inventory.length ? 
                        <tbody>
                            {
                                inventory.map((value,index) => {
                                    return <tr key={index} className="rows">
                                        <td>{value.item.itemName}</td>
                                        <td>{value.quantity}</td>
                                        <td>{value.item.price}</td>
                                        <td><i className="icon-trash" onClick={()=>{this._deleteItem(value.item, index)}}/></td>
                                    </tr>
                                })
                            }
                        </tbody>
                        :null
                    }
                </table>
            </div>
        );
    }
}

export default Main;