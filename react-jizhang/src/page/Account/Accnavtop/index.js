import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class Accnavtop extends Component {
    render() {
        return (
            <div>
                <Link to="/app/Account">全部账户</Link>/<Link to="/app/Account/createaccount">新增账户</Link>
            </div>
        );
    }
}

export default Accnavtop;