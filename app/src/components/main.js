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
            <div className="contents">
                <div className="contents-title">
                    {
                        categories.length ? <div className="contents-title-cates">{
                            categories.map((value, index) => {
                                return index != categories.length-1 ?
                                    (<span className="cate">{value}  ></span>):(<span className="cate">{value}</span>);
                                
                            })
                        }
                        </div> : null
                    }
                </div>
                <table>
                    <tr className="label">
                        <th>Product name</th>
                        <th>Quantity</th>
                        <th>Unit price</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>product1</td>
                        <td>10</td>
                        <td>$10.20</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>product1</td>
                        <td>10</td>
                        <td>$10.20</td>
                        <td>X</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Main;