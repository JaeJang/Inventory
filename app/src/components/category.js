import React, {Component} from 'react';
import _ from 'lodash';

class Category extends Component {

    _onclick() {
        const change = _.get(this.props,`onclick`);
        const category = this.props.details;
        change(category.id);
    }

    

    render() {
        const category = this.props.details;
        return (
            <div 
                className="sidebar-category"
                onClick = { ()=>{ this.props.onclick(category.cateId) } }
            >
                <span className="category-name">{category.name}</span>
                {
                    category.hasSub ? 
                        <span className="sub-category-arrow">
                            <i className="icon-right-open"></i>
                        </span>
                        : null
                }
                
            </div>
            
        );
    }
}

export default Category;