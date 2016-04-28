import React, { Component, PropTypes } from 'react';

export default class Profile extends Component {
    render() {
        return (
        <div>
            <h2>{this.props.userInfo.name} Profile</h2>

                    <div >name: {this.props.userInfo.name}</div>

                    <div>email: {this.props.userInfo.email}</div>

                <div><img className="image" src={this.props.userInfo.img_url} /></div>
        </div>
        )
    }
}

// requiring from parent comp.
Profile.PropTypes = {
    userInfo: PropTypes.object.isRequired
}

/*
1. create a form
2. default text is user's info from userInfo
    editable field
4. update info to db
5. 

*/