import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import {findDOMNode} from 'react-dom';


var items = [];

var CodeSelectField = React.createClass ({

    handleChange: function(event, index, value){
        this.setState({
            value: event.target.value
        });
    },

    getInitialState: function(){
        return {
            items: [],
            isVisible: false
        };
    },

    isVisible: function(){
        return this.state.isVisible;
    },

    componentDidMount: function(){
        this.serverRequest = $.get(this.props.source, function (result){

            items = (result['result']);
            this.setState({
                items: items
            });
        }.bind(this), 'json');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    setVisible: function(){
        this.state.isVisible = true;
    },

    render: function() {
        var menuItems = [];
        for (var key in this.state.items) {
            menuItems.push(<option key={this.state.items[key].id} value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }

        return (
            <div>
                <FormGroup>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        onChange={this.handleChange}
                        name="code">
                        <option key="0" value="select">Code</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var NameSelectField = React.createClass ({

    handleChange: function(event, index, value){
        this.setState({
            value: event.target.value
        });
    },

    getInitialState: function(){
        return {
            items: [],
            isVisible: false
        };
    },

    isVisible: function(){
        return this.state.isVisible;
    },

    componentDidMount: function(){
        this.serverRequest = $.get(this.props.source, function (result){

            items = (result['result']);
            this.setState({
                items: items
            });
        }.bind(this), 'json');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    setVisible: function(){
        this.state.isVisible = true;
    },

    render: function() {
        var menuItems = [];
        for (var key in this.state.items) {
            menuItems.push(<option key={this.state.items[key].id} value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }

        return (
            <div>
                <FormGroup>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        onChange={this.handleChange}
                        name="name">
                        <option key="0" value="select">Name</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var SyringeNumberSelectField = React.createClass ({

    handleChange: function(event, index, value){
        this.setState({
            value: event.target.value,
        });
    },

    getInitialState: function(){
        return {
            items: [],
            isVisible: false
        };
    },

    isVisible: function(){
        return this.state.isVisible;
    },

    componentDidMount: function(){
        this.serverRequest = $.get(this.props.source, function (result){

            items = (result['result']);
            this.setState({
                items: items
            });
        }.bind(this), 'json');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    setVisible: function(){
        this.state.isVisible = true;
    },

    render: function() {
        var menuItems = [];
        for (var key in this.state.items) {
            menuItems.push(<option key={this.state.items[key].id} value={this.state.items[key].id}>{`${this.state.items[key].serial}`}</option>);
        }

        return (
            <div>
                <FormGroup>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        onChange={this.handleChange}
                        name="seringe_num">
                        <option key="0" value="select">Syringe</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var CampaignSelectField = React.createClass ({

    handleChange: function(event, index, value){
        this.setState({
            value: event.target.value
        });
    },

    getInitialState: function(){
        return {
            items: [],
            isVisible: false
        };
    },

    isVisible: function(){
        return this.state.isVisible;
    },

    componentDidMount: function(){
        this.serverRequest = $.get(this.props.source, function (result){

            items = (result['result']);
            this.setState({
                items: items
            });
        }.bind(this), 'json');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    setVisible: function(){
        this.state.isVisible = true;
    },

    render: function() {
        var menuItems = [];
        for (var key in this.state.items) {
            menuItems.push(<option key={this.state.items[key].id} value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }

        return (
            <div>
                <FormGroup>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        onChange={this.handleChange}
                        name="role">
                        <option key="0" value="select">Campaign</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var NewLabForm = React.createClass ({


    _create: function () {
        var fields = [
            'code', 'analyser', 'name', 'seringe_num', ''
        ];
        var data = {};
        for (var i=0;i<fields.length;i++){
            var key= fields[i];
            data[key] = this.state[key];
        }
        console.log(data);

        return $.ajax({
            url: '/api/v1.0/test/',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data, textStatus) { },
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this)
        })
    },
    _onSubmit: function (e) {
        e.preventDefault();
        // var errors = this._validate();
        // if(Object.keys(errors).length != 0) {
        //   this.setState({
        //     errors: errors
        //   });
        //    return;
        // }
        var xhr = this._create();
        xhr.done(this._onSuccess)
            .fail(this._onError)
            .always(this.hideLoading)
    },
    hideLoading: function () {
        this.setState({loading: false});
    },
    _onSuccess: function (data) {
        this.refs.eqtype_form.getDOMNode().reset();
        this.setState(this.getInitialState());
        // show success message
    },
    _onError: function (data) {
        var message = "Failed to create";
        var res = data.responseJSON;
        if(res.message) {
            message = data.responseJSON.message;
        }
        if(res.errors) {
            this.setState({
                errors: res.errors
            });
        }
    },
    _onChange: function (e) {
        var state = {};
        // console.log(e.target.type);
        if(e.target.type == 'checkbox'){
            state[e.target.name] = e.target.checked;
        }
        else if(e.target.type == 'select-one'){
            state[e.target.name] = e.target.value;
        }
        else{
            state[e.target.name] = $.trim(e.target.value);
        }
        this.setState(state);
    },
    _validate: function () {
        var errors = {};
        // if(this.state.username == "") {
        //   errors.username = "Username is required";
        // }
        // if(this.state.email == "") {
        //   errors.email = "Email is required";
        // }
        // if(this.state.password == "") {
        //   errors.password = "Password is required";
        // }
        // return errors;
    },
    _formGroupClass: function (field) {
        var className = "form-group ";
        if(field) {
            className += " has-error"
        }
        return className;
    },

    getInitialState: function () {
        return {
            loading: false,
            errors: {},
            equipment_number: ''
        }
    },

    handleClick: function() {
        document.getElementById('test_prof').remove();
    },

    render : function() {

        return(
            <div className="form-container">
                <form method="post" action="#" onSubmit={this._onSubmit} onChange={this._onChange}>
                    <Panel header="New Laboratory Profile">

                        <div className="row">
                            <div className="col-md-12">
                                <CodeSelectField
                                    source="http://dev.vision.local/api/v1.0/code"
                                    handleChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <FormGroup>
                                    <FormControl type="text"
                                                 placeholder="Analyser"
                                                 name="analyser"
                                    />
                                </FormGroup>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <NameSelectField
                                    source="http://dev.vision.local/api/v1.0/contract_status_id"
                                    handleChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <SyringeNumberSelectField
                                    source="http://dev.vision.local/api/v1.0/seringe_num"
                                    handleChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <CampaignSelectField
                                    source="http://dev.vision.local/api/v1.0/"
                                    handleChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 ">
                                 <Button bsStyle="success" 
                                        className="btn btn-success pull-right"
                                        type="submit"
                                >Save</Button>
                                &nbsp;
                                <Button bsStyle="danger" 
                                        className="pull-right" 
                                        onClick={this.props.handleClose}
                                        className="pull-right margin-right-xs"
                                >Cancel</Button>
                            </div>
                        </div>
                    </Panel>
                </form>
            </div>
        );
    }
});


export default NewLabForm;