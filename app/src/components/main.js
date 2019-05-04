import React, {Component} from  'react';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: ["All", "sub"],
        }

        
    }

    render() {

        const {categories} = this.state;

        return (
            <div className="contents" ref={ this.props.mainRef }>
                <div className="contents-title">
                    {
                        categories.length ? <div className="contents-title-cates">{
                            categories.map((value, index) => {
                                return index != categories.length-1 ?
                                    (<span key={index} className="cate">{value}  <i className={'icon-right-open'}></i></span>):(<span key={index} className="cate">{value}</span>);
                                
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
                    <tbody>
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
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Main;