import React from 'react';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Panel from 'react-bootstrap/lib/Panel';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import {findDOMNode} from 'react-dom';
import Radio from 'react-bootstrap/lib/Radio';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import {NotificationContainer, NotificationManager} from 'react-notifications';

var TestProfileSelectField = React.createClass({

    getInitialState: function () {
        return {
            isVisible: true
        };
    },

    handleChange: function (event) {
        this.setState({
            value: event.target.value
        });
        this.loadProfileData(event);
    },

    loadProfileData: function (event) {

        if ('select' == event.target.value) {

            this.setState({
                saved_profile: null
            });

            this.props.fillUpForm();

        } else {

            this.serverRequest = $.authorizedGet('/api/v1.0/electrical_profile/' + event.target.value, function (result) {
                this.setState({
                    saved_profile: result['result']
                });
                this.props.fillUpForm(this.state.saved_profile);
            }.bind(this), 'json');
        }
    },

    componentDidMount: function () {
        this.serverRequest = $.authorizedGet(this.props.source, function (result) {
            this.setState({
                items: result['result']
            });
        }.bind(this), 'json');
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    setVisible: function () {
        this.state.isVisible = true;
    },

    render: function () {
        var options = [];
        for (var key in this.state.items) {
            var index = Math.random() + '_' + this.state.items[key].id;
            options.push(<option key={index}
                                 value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }

        return (
            <FormGroup>
                <FormControl
                    componentClass="select"
                    placeholder="select"
                    value={this.state.value}
                    onChange={this.handleChange}
                    name="test_prof">
                    <option value="select">Choose profile from saved</option>
                    {options}
                </FormControl>
            </FormGroup>
        )
    }
});


const ElectricalProfileForm = React.createClass({

    getInitialState: function () {
        return {
            loading: false,
            errors: {},
            data: {},
            fields: [
                'bushing',
                'insulation',
                'degree',
                'winding',
                'visual',
                'turns',
                'insulation_pf',
                'resistance',
                'selection',
                'shared',
                'name',
                'description'
            ]
        }
    },

    componentDidMount: function () {
        if (this.props.electricalProfileId) {
            this.serverRequest = $.authorizedGet('/api/v1.0/electrical_profile/' + this.props.electricalProfileId, function (result) {
                this.fillUpForm(result['result']);
            }.bind(this), 'json');
        } else {
            this.fillUpForm(this.props.testResultData);
        }
    },

    fillUpForm: function (saved_data) {
        if (null == saved_data) {
            this.refs.electrical_profile.reset();
        } else {
            this.setState({
                data: saved_data
            });
        }
    },

    _save: function () {
        var fields = this.state.fields;
        var data = {};
        for (var i = 0; i < fields.length; i++) {
            var key = fields[i];
            data[key] = this.state.data[key];
        }
        if (this.state.name != '' && (typeof this.state.name != 'undefined')) {
            var url = '/api/v1.0/electrical_profile/';
            if (this.state.data.electrical_profile_id) {
                url = url + this.state.data.electrical_profile_id;
            }
            // if profile name is not empty and radio is checked then use this url to save profile
            // and save to test_result
            // otherwise just use these values for saving test_result
            $.authorizedAjax({
                url: url,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (data, textStatus) {
                },
                beforeSend: function () {
                    this.setState({loading: true});
                }.bind(this)
            });
            delete data['shared'];
        }

        delete data['description'];
        delete data['name'];
        data['campaign_id'] = this.props.data.campaign_id;
        data['equipment_id'] = this.props.data.equipment_id;

        // save part to test_result
        return $.authorizedAjax({
            url: '/api/v1.0/test_result/' + this.props.data.id,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this)
        });
    },

    _onSubmit: function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.is_valid()){
			NotificationManager.error('Please correct the errors');
			return false;
		}
        var xhr = this._save();
        xhr.done(this._onSuccess)
            .fail(this._onError)
            .always(this.hideLoading)
    },

    hideLoading: function () {
        this.setState({loading: false});
    },

    _onSuccess: function (data) {
        NotificationManager.success('Profile saved successfully');
        this.props.handleClose();
        this.hideLoading();
    },

    _onError: function (data) {
        var message = "Failed to create";
        var res = data.responseJSON;
        if (res.message) {
            message = data.responseJSON.message;
        }
        if (res.error) {
			// We get list of errors
			if (data.status >= 500) {
				message = res.error.join(". ");
			} else if (res.error instanceof Object){
				// We get object of errors with field names as key
				for (var field in res.error) {
					var errorMessage = res.error[field];
					if (Array.isArray(errorMessage)) {
						errorMessage = errorMessage.join(". ");
					}
					res.error[field] = errorMessage;
				}
				this.setState({
					errors: res.error
				});
			} else {
				message = res.error;
			}
		}
        NotificationManager.error(message);
    },

    _onChange: function (e) {
        var state = this.state.data;
        if (e.target.type == 'checkbox') {
            state[e.target.name] = e.target.checked;
        } else if (e.target.type == 'select-one') {
            state[e.target.name] = e.target.value;
        } else if (e.target.type == 'radio') {
            state[e.target.name] = (e.target.value == "1");
        } else {
            state[e.target.name] = e.target.value;
        }
        var errors = this._validate(e);
        state = this._updateFieldErrors(e.target.name, state, errors);
        this.setState({data: state});
    },

    _validate: function (e) {
        var errors = [];
        var error = this._validateFieldLength(e.target.value, e.target.getAttribute("data-len"));
        if (error){
            errors.push(error);
        }
        return errors;
    },

    _validateFieldLength: function (value, length){
        var error = "";
        if (value && length){
            if (value.length > length){
                error = "Value should be maximum " + length + " characters long"
            }
        }
        return error;
    },

    _updateFieldErrors: function (fieldName, state, errors){
        // Clear existing errors related to the current field as it has been edited
        state.errors = this.state.errors;
        delete state.errors[fieldName];

        // Update errors with new ones, if present
        if (Object.keys(errors).length){
            state.errors[fieldName] = errors.join(". ");
        }
        return state;
    },

    is_valid: function () {
        return (Object.keys(this.state.errors).length <= 0);
    },

    _formGroupClass: function (field) {
        var className = "form-group ";
        if (field) {
            className += " has-error"
        }
        return className;
    },


    render: function () {
        return (
            <div className="form-container">
                <form ref="electrical_profile" method="post" action="#" onSubmit={this._onSubmit}
                      onChange={this._onChange}>
                    <div className="maxwidth">
                        <Panel header="Electrical profile test parametres">
                            <div className="row">
                                <div className="col-md-9"></div>
                                <div className="col-md-3">
                                    <FormGroup>
                                        <TestProfileSelectField fillUpForm={this.fillUpForm}
                                                                source="/api/v1.0/electrical_profile"/>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="scheduler-border">
                                <fieldset className="scheduler-border">
                                    <legend className="scheduler-border">Test requested</legend>
                                    <div className="control-group">
                                        <div className="maxwidth">
                                            <div className="col-md-4 nopadding padding-right-xs">
                                                <Checkbox
                                                    name="bushing"
                                                    checked={this.state.data.bushing ? 'checked': null}
                                                    value="1"
                                                >Bushing Cap and PF</Checkbox>
                                            </div>
                                            <div className="col-md-4 nopadding padding-right-xs">
                                                <Checkbox
                                                    name="insulation"
                                                    checked={this.state.data.insulation ? 'checked': null}
                                                    value="1"
                                                >Insulation Resistance</Checkbox>
                                            </div>
                                            <div className="col-md-4 nopadding">
                                                <Checkbox
                                                    name="degree"
                                                    checked={this.state.data.degree ? 'checked': null}
                                                    value="1"
                                                >Degree of Polymerization(DP)</Checkbox>
                                            </div>
                                        </div>
                                        <div className="maxwidth">
                                            <div className="col-md-4 nopadding padding-right-xs">
                                                <Checkbox
                                                    name="winding"
                                                    checked={this.state.data.winding ? 'checked': null}
                                                    value="1"
                                                >Winding Cap an PF</Checkbox>
                                            </div>
                                            <div className="col-md-4 nopadding padding-right-xs">
                                                <Checkbox
                                                    name="visual"
                                                    checked={this.state.data.visual ? 'checked': null}
                                                    value="1"
                                                >Visual Inspection</Checkbox>
                                            </div>
                                            <div className="col-md-4 nopadding">
                                                <Checkbox
                                                    name="turns"
                                                    checked={this.state.data.turns ? 'checked': null}
                                                    value="1"
                                                >Turns Ration Test (TTR)</Checkbox>
                                            </div>
                                        </div>
                                        <div className="maxwidth">
                                            <div className="col-md-4 nopadding padding-right-xs">
                                                <Checkbox
                                                    name="insulation_pf"
                                                    checked={this.state.data.insulation_pf ? 'checked': null}
                                                    value="1"
                                                >Winding Cap and PF Doble</Checkbox>
                                            </div>
                                            <div className="col-md-4 nopadding padding-right-xs">
                                                <Checkbox
                                                    name="resistance"
                                                    checked={this.state.data.resistance ? 'checked': null}
                                                    value="1"
                                                >Resistance; winding/contact</Checkbox>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="row">
                                    <div className="col-md-1">
                                        <div>Save As</div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="row">
                                            <FormGroup validationState={this.state.errors.name ? 'error' : null}>
                                                <FormControl type="text"
                                                             placeholder="Electrical profile name"
                                                             name="name"
                                                             data-len="256"
                                                             value={this.state.name}
                                                />
                                                <HelpBlock className="warning">{this.state.errors.name}</HelpBlock>
                                                <FormControl.Feedback />
                                            </FormGroup>
                                        </div>
                                        <div className="row">
                                            <Radio name="shared" value="1" inline={true}>
                                                Global
                                            </Radio>
                                            <Radio name="shared" value="0" inline={true}>
                                                Private
                                            </Radio>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <FormGroup controlId="descTextarea"
                                                   validationState={this.state.errors.description ? 'error' : null}>
                                            <FormControl
                                                componentClass="textarea"
                                                placeholder="Description"
                                                ref="description"
                                                name="description"
                                                data-len="1024"
                                                value={this.state.description}
                                            />
                                            <HelpBlock className="warning">{this.state.errors.description}</HelpBlock>
                                            <FormControl.Feedback />
                                        </FormGroup>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <Button bsStyle="success" type="submit" className="pull-right">Apply</Button>
                                        <Button bsStyle="danger"
                                                onClick={this.props.handleClose}
                                                className="pull-right margin-right-xs">Close</Button>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                    </div>
                </form>
            </div>
        );
    }
});

export default ElectricalProfileForm;
