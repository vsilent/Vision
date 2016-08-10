import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import DateTimeField from 'react-bootstrap-datetimepicker/lib/DateTimeField'
import Panel from 'react-bootstrap/lib/Panel';
import Radio from 'react-bootstrap/lib/Radio';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import {findDOMNode} from 'react-dom';
import ElectricalProfileForm from './ElectricalProfileForm';
import FluidProfileForm from './FluidProfileForm';
import Modal from 'react-bootstrap/lib/Modal';
var items=[];


var CreatedBySelectField = React.createClass ({

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
                        placeholder="select user"
                        onChange={this.handleChange}
                        name="created_by_id">
                        <option key="0" value="select">Created by</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var PerformedBySelectField = React.createClass ({

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
                        name="performed_by_id">
                        <option key="0" value="select">Performed by</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var MaterialSelectField = React.createClass ({

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
                        placeholder="select material"
                        onChange={this.handleChange}
                        name="material">
                        <option key="0" value="select">Material</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var FluidTypeSelectField = React.createClass ({

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
                        name="fluid_type_id"
                    >
                        <option key="0" value="select">Fluid Type</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var LabAnalyserSelectField = React.createClass ({

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
            menuItems.push(<option key={this.state.items[key].id} value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }

        return (
            <div>
                <FormGroup>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        onChange={this.handleChange}
                        name="lab_id">
                        <option key="0" value="select">Lab/On-Line Analyser</option>
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
                        <option key="0" value="select">Syringe Number</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var RecommendSelectField = React.createClass ({

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
            menuItems.push(<option key={this.state.items[key].id} value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }

        return (
            <div>
                <FormGroup>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        onChange={this.handleChange}
                        name="recommandation_id">
                        <option key="0" value="select">Recommendation</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var RecommendBySelectField = React.createClass ({

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
            menuItems.push(<option key={this.state.items[key].id} value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }

        return (
            <div>
                <FormGroup>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        onChange={this.handleChange}
                        name="recommended_by_id">
                        <option key="0" value="select">Recommendation By</option>
                        {menuItems}
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
});


var NewTestForm = React.createClass ({


    _create: function () {
        var fields = [
            'fluid_type_id',
            'lab_id', 'contract', 'test_reason', 'comments',
            'recommandation_id','recommended_by_id','recommendationNotes',
            'analysis_number', 'charge', 'remark', 'transmission', 'repair_date',
            'repair_description', 'date_application','comments', 'mws', 'temperature',
            'sampling_card_print', 'containers', 'sampling_card_gathered', 'gathered_test_type',
            'seringe_num', 'ambient_air_temperature', 'test_result'

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

        console.log(e.target.type);
        console.log(e.target.value);

        if(e.target.type == 'checkbox'){
            state[e.target.name] = e.target.checked;
        }
        else if(e.target.type == 'select-one'){
            state[e.target.name] = e.target.value;
        }
        else if (e.target.type == 'radio') {
            state[e.target.name] = e.target.value;
            if( 'fluid' === e.target.value) {
                this.setState({
                    showFluidProfileForm: true,
                    showElectroProfileForm: false
                });
            } else if ( 'electro' === e.target.value ) {
                this.setState({
                    showElectroProfileForm: true,
                    showFluidProfileForm: false
                });
            }
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
            equipment_number: '',
            showFluidProfileForm: false,
            showElectroProfileForm: false
        }
    },

    handleClick: function() {
        document.getElementById('test_prof').remove();
    },

    closeElectricalProfileForm: function () {
        
        console.log('here');
        this.setState({
            showElectroProfileForm: false

        })
    },

    closeFluidProfileForm: function () {
        console.log('here2');
        
        this.setState({
            showFluidProfileForm: false
        })

    },

    render : function() {
console.log(this.state.showFluidProfileForm);
console.log(this.state.showElectroProfileForm);
        return(
            <div className="form-container">
                <form method="post" action="#" onSubmit={this._onSubmit} onChange={this._onChange}>
                    <Panel header="New Test">
                        <div className="maxwidth">
                            <div className="col-md-12">

                                <div className="maxwidth">
                                    <FormGroup>
                                        <FormControl type="text"
                                                     placeholder="Analysis Number"
                                                     name="analysis_number"
                                        />
                                    </FormGroup>
                                </div>

                                <div className="maxwidth">
                                    <div className="datetimepicker input-group date col-md-3">
                                        <FormGroup>
                                            <ControlLabel>Date Created</ControlLabel>
                                            <DateTimeField datetime={this.state.cr_date} />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-11">
                                        <CreatedBySelectField
                                            source="http://dev.vision.local/api/v1.0/user"
                                            handleChange={this.handleChange} />
                                    </div>
                                    <div className="col-md-1">
                                        <Button bsStyle="primary" >New</Button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-11">
                                        <MaterialSelectField
                                            source="http://dev.vision.local/api/v1.0/material/"
                                            handleChange={this.handleChange} />
                                    </div>
                                    <div className="col-md-1">
                                        <Button bsStyle="primary" >New</Button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-11">
                                        <FluidTypeSelectField
                                            source="http://dev.vision.local/api/v1.0/fluid_type/"
                                            value={this.state.value} />
                                    </div>
                                    <div className="col-md-1">
                                        <Button bsStyle="primary" >New</Button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-11">
                                        <PerformedBySelectField
                                            source="http://dev.vision.local/api/v1.0/user"
                                            handleChange={this.handleChange} />
                                    </div>
                                    <div className="col-md-1">
                                        <Button bsStyle="primary" >New</Button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-11">
                                        <LabAnalyserSelectField
                                            source="http://dev.vision.local/api/v1.0/lab/"
                                            value={this.state.value} />
                                    </div>
                                    <div className="col-md-1">
                                        <Button bsStyle="primary" >New</Button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-11">
                                        <RecommendSelectField
                                            source="http://dev.vision.local/api/v1.0/recommandation_id/"
                                            value={this.state.value} />
                                    </div>
                                    <div className="col-md-1">
                                        <Button bsStyle="primary" >New</Button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-11">
                                        <RecommendBySelectField
                                            source="http://dev.vision.local/api/v1.0/recommended_by_id/"
                                            value={this.state.value} />
                                    </div>
                                    <div className="col-md-1">
                                        <Button bsStyle="primary" >New</Button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <FormGroup>
                                            <FormControl type="text"
                                                         placeholder="Charge"
                                                         name="charge"
                                            />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <FormGroup>
                                            <ControlLabel>Remark</ControlLabel>
                                            <FormControl componentClass="textarea"
                                                         placeholder="remark"
                                                         name="remark"/>
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="maxwidth">
                                    <div className="col-md-4 nopadding padding-right-xs">
                                        <Checkbox name="transmission">Sent to Laboratory</Checkbox>
                                    </div>
                                </div>


                                <div className="maxwidth">
                                    <div className="datetimepicker input-group date col-md-3">
                                        <FormGroup>
                                            <ControlLabel>Repair Date</ControlLabel>
                                            <DateTimeField datetime={this.state.repair_date} />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <FormGroup>
                                            <ControlLabel>Repair Description</ControlLabel>
                                            <FormControl componentClass="textarea"
                                                         placeholder="repair description"
                                                         name="repair_description"/>
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <FormGroup>
                                            <ControlLabel>Recommendation Notes</ControlLabel>
                                            <FormControl componentClass="textarea"
                                                         placeholder="recommendations"
                                                         name="recommendationNotes"
                                            />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="maxwidth">
                                    <div className="datetimepicker input-group date col-md-3">
                                        <FormGroup>
                                            <ControlLabel>Date Applied</ControlLabel>
                                            <DateTimeField datetime={this.state.date_application} />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <FormGroup>
                                            <ControlLabel>Comments</ControlLabel>
                                            <FormControl componentClass="textarea"
                                                         placeholder="comments"
                                                         name="comments"
                                            />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <FormGroup>
                                            <FormControl type="text"
                                                         placeholder="Equipment Load mW"
                                                         name="mws" />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <FormGroup>
                                            <FormControl type="text"
                                                         placeholder="Temperature"
                                                         name="temperature"
                                            />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="maxwidth">
                                    <div className="col-md-4 nopadding padding-right-xs">
                                        <Checkbox name="sampling_card_print">Sampling Card Print</Checkbox>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <FormGroup>
                                            <FormControl type="text"
                                                         placeholder="Container Number"
                                                         name="containers"
                                            />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <FormGroup>
                                            <FormControl type="text"
                                                         placeholder="Sampling Card Gathered"
                                                         name="sampling_card_gathered"
                                            />
                                        </FormGroup>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-md-11">
                                        <SyringeNumberSelectField
                                            source="http://dev.vision.local/api/v1.0/syringe/"
                                            handleChange={this.handleChange} />
                                    </div>
                                    <div className="col-md-1">
                                        <Button bsStyle="primary" >New</Button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <FormGroup>
                                            <FormControl type="text"
                                                         placeholder="Ambient Air Temperature"
                                                         name="ambient_air_temperature"
                                            />
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    Please choose test type
                                </div>
                                <div className="maxwidth">
                                    <Radio name="profile" value="fluid">
                                        Fluid Profile
                                    </Radio>
                                    <Radio name="profile" value="electro">
                                        Electrical Profile
                                    </Radio>
                                </div> 
                                <div className="row">
                                    <div className="col-md-12">
                                        <Button bsStyle="success" type="submit" className="pull-right">Save</Button>
                                        <Button bsStyle="danger" className="pull-right margin-right-xs">Cancel</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Panel>
                </form>
                <Modal show={this.state.showElectroProfileForm}>
                        <ElectricalProfileForm handleClose={this.closeElectricalProfileForm} />
                </Modal>
                <Modal show={this.state.showFluidProfileForm}>
                        <FluidProfileForm handleClose={this.closeFluidProfileForm}/>
                </Modal>
            </div>
        );
    }
});


export default NewTestForm;


