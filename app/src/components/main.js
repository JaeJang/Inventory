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
        this._updateInventory();
        this._updateCategoryList(this.props.currentCate);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.currentCate != nextProps.currentCate){
            const cateId = _.get(nextProps,'[currentCate].cateId');
            this._updateInventory(cateId);
            this._updateCategoryList(nextProps.currentCate);
        }
    }


    _updateInventory(cateId) {
        getInventory(data => {this.setState({inventory:data})}, cateId);
    }

    _updateCategoryList(currentCate){
        const categoryList = [];
        if(currentCate){
            let parent = currentCate;
            while(parent){
                categoryList.unshift({name:parent.name, cateId:parent.cateId});    
                parent = parent.parent;
            }
        }
        categoryList.unshift({name:"All", cateId:null});
        this.setState({categoryList: categoryList});
    }

    _deleteItem(item, index) {
        let yes = window.confirm("Do you want to delete " + item.itemName + " item?");
        if(yes){
            deleteItem( res => {
                if(res){
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
                                return index != categoryList.length-1 ?
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
                    {/* <tbody>
                        
                        <tr>
                            <td>product1</td>
                            <td>10</td>
                            <td>$10.20</td>
                            <td><i className="icon-trash"></i></td>
                        </tr>
                        <tr>
                            <td>product1</td>
                            <td>10</td>
                            <td>$10.20</td>
                            <td><i className="icon-trash"></i></td>
                        </tr>
                    </tbody> */}
                </table>
            </div>
        );
    }
}

export default Main;