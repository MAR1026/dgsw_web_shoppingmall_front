import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class Join extends Component {

    state = {
        goToHome: false
    };

    render () {
        if(this.state.goToMain)
            return <Redirect to='/'/>

    }

}


export default Join;