import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import {findDOMNode} from 'react-dom';
import {hashHistory} from 'react-router';
import {Link} from 'react-router';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


const TextField = React.createClass({
    render: function () {
        var label = (this.props.label != null) ? this.props.label : "";
        var name = (this.props.name != null) ? this.props.name : "";
        var value = (this.props.value != null) ? this.props.value : "";
        return (
            <FormGroup>
                <ControlLabel>{label}</ControlLabel>
                <FormControl type="text"
                             placeholder={label}
                             name={name}
                             value={value}
                />
                <FormControl.Feedback />
            </FormGroup>
        );
    }
});

var SelectField = React.createClass({
    handleChange: function (event, index, value) {
        this.setState({
            value: event.target.value
        });
    },
    getInitialState: function () {
        return {
            items: [],
            isVisible: false,
            value: -1
        };
    },
    isVisible: function () {
        return this.state.isVisible;
    },
    componentDidMount: function () {
        var source = '/api/v1.0/' + this.props.source + '/';
        this.serverRequest = $.get(source, function (result) {
            this.setState({items: (result['result'])});
        }.bind(this), 'json');
    },
    componentWillUnmount: function () {
        this.serverRequest.abort();
    },
    setVisible: function () {
        this.state.isVisible = true;
    },
    render: function () {
        var label = (this.props.label != null) ? this.props.label : "";
        var value = (this.props.value != null) ? this.props.value : "";
        var menuItems = [];
        for (var key in this.state.items) {
            menuItems.push(<option key={this.state.items[key].id}
                                   value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }
        return (
            <FormGroup>
                <ControlLabel>{label}</ControlLabel>
                <FormControl componentClass="select"
                             onChange={this.handleChange}
                             defaultValue={value}
                >
                    {menuItems}
                </FormControl>
            </FormGroup>
        );
    }
});

const CheckBox = React.createClass({
    render: function () {
        var label = (this.props.label != null) ? this.props.label : "";
        var name = (this.props.name != null) ? this.props.name : "";
        var checked = (this.props.value != null) ? this.props.value : false;
        var is_checked = (checked) ? 'checked' : '';
        return (
            <Checkbox checked={is_checked} name={name}>
                {label}
            </Checkbox>
        );
    }
});


var BreakerParams = React.createClass({

    getInitialState: function () {
        return {
            loading: false,
            errors: {},
            fields: ["phase_number", "sealed", "welded_cover", "current_rating", "open", "current_rating"
            ]
        }
    },

    componentDidMount: function () {

    },

    _create: function () {
        var fields = this.state.fields;
        var data = {test_result_id: this.props.testResultId};
        var url = '/api/v1.0/' + this.props.tableName + '/';
        var type = 'POST';
        for (var i = 0; i < fields.length; i++) {
            var key = fields[i];
            data[key] = this.state[key];
        }
        return $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this)
        })
    },
    _onSubmit: function (e) {
        e.preventDefault();
        var errors = this._validate();
        if (Object.keys(errors).length != 0) {
            this.setState({
                errors: errors
            });
            return;
        }
        var xhr = this._create();
        xhr.done(this._onSuccess)
            .fail(this._onError)
            .always(this.hideLoading)
    },

    hideLoading: function () {
        this.setState({loading: false});
    },

    _onSuccess: function (data) {
        // this.setState(this.getInitialState());

    },

    _onError: function (data) {

        var message = "Failed to create";
        var res = data.responseJSON;
        if (res.message) {
            message = data.responseJSON.message;
        }
        if (res.error) {
            this.setState({
                errors: res.error
            });
        }
    },

    _onChange: function (e) {
        var state = {};
        if (e.target.type == 'checkbox') {
            state[e.target.name] = e.target.checked;
        } else if (e.target.type == 'select-one') {
            state[e.target.name] = e.target.value;
        } else {
            state[e.target.name] = e.target.value;
        }
        this.setState(state);
    },

    _validate: function () {
        var errors = {};
        // if(this.state.created_by_id == "") {
        //   errors.created_by_id = "Create by field is required";
        // }
        // if(this.state.performed_by_id == "") {
        //     errors.performed_by_id = "Performed by field is required";
        // }
        return errors;
    },

    render: function () {
        return (
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <SelectField
                            source="fluid_type"
                            label="Fluid Type"
                            value={this.state.fluid_type_id}/>
                    </div>
                    <div className="col-md-3">
                        <SelectField
                            source="fluid_level"
                            label="Fluid Level"
                            value={this.state.fluid_level_id}/>
                    </div>
                    <div className="col-md-3">
                        <SelectField
                            source="interruping_medium"
                            label="Interruping Medium"
                            value={this.state.interruping_medium_id}/>
                    </div>
                    <div className="col-md-3">
                        <SelectField
                            source="breaker_mechanism"
                            label="Breaker Mechanism"
                            value={this.state.breaker_mechanism_id}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <TextField label="Phase Number" name="phase_number" value={this.state.phase_number}/>
                    </div>
                    <div className="col-md-3">
                        <TextField label="Open" name="open" value={this.state.kv}/>
                    </div>
                    <div className="col-md-3">
                        <TextField label="Current Rating" name="current_rating" value={this.state.kvar}/>
                    </div>
                    <div className="col-md-1 ">
                        <b>Sealed</b> <CheckBox name="sealed" value={this.state.tank_winding_flag}/>
                    </div>
                    <div className="col-md-1">
                        <b>Welded Cover</b> <CheckBox name="welded_cover" value={this.state.welded_cover}/>
                    </div>
                </div>
            </div>

        )
    }
});


export default BreakerParams;