import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker/lib/DateTimeField';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Button from 'react-bootstrap/lib/Button';
import NewBushingTestForm from './TestTypeResultForm_modules/NewBushingTestForm';
import WindingTestForm from './TestTypeResultForm_modules/WindingTestForm';
import NewInsulationResistanceTestForm from './TestTypeResultForm_modules/NewInsulationResistanceTestForm';
import VisualTestForm from './TestTypeResultForm_modules/VisualTestForm';
import NewWindingResistanceTestForm from './TestTypeResultForm_modules/NewWindingResistanceTestForm';
import PolymerisationDegreeTestForm from './TestTypeResultForm_modules/PolymerisationDegreeTestForm';
import NewTransformerTestForm from './TestTypeResultForm_modules/NewTransformerTestForm';
import NewDissolvedGasForm from './TestTypeResultForm_modules/NewDissolvedGasTestForm';
import WaterTestForm from './TestTypeResultForm_modules/WaterTestForm';
import NewFuranTestForm from './TestTypeResultForm_modules/NewFuranTestForm';
import NewInhibitorTestForm from './TestTypeResultForm_modules/NewInhibitorTestForm';
import NewPcbTestForm from './TestTypeResultForm_modules/NewPcbTestForm';
import NewFluidTestForm from './TestTypeResultForm_modules/NewFluidTestForm';
import NewParticleTestForm from './TestTypeResultForm_modules/NewParticleTestForm';
import MetalsInOilTestForm from './TestTypeResultForm_modules/MetalsInOilTestForm';

var SelectField = React.createClass({
    getInitialState: function () {
        return {
            items: [],
            isVisible: false,
        };
    },
    isVisible: function(){
        return this.state.isVisible;
    },
    componentDidMount: function(){
        var source = '/api/v1.0/' + this.props.source + '/';
        this.serverRequest = $.get(source, function (result){
            this.setState({ items: (result['result']) });
        }.bind(this), 'json');
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    setVisible: function(){
        this.state.isVisible = true;
    },
    render: function() {
        var label = (this.props.label != null) ? this.props.label: "";
        var name = (this.props.name != null) ? this.props.name: "";
        var value = (this.props.value != null) ? this.props.value: "";
        var menuItems = [];
        for (var key in this.state.items) {
            menuItems.push(<option key={this.state.items[key].id}
                                   value={this.state.items[key].id}>{`${this.state.items[key].name}`}</option>);
        }
        return (
            <FormGroup>
                <ControlLabel>{label}</ControlLabel>
                <FormControl componentClass="select"
                             onChange={this.props.onChange}
                             name={name}
                             value={value}
                             >
                    <option key={null} value={null}> </option>
                    {menuItems}
                    <FormControl.Feedback />
                </FormControl>
            </FormGroup>
        );
    }
});

const DateTimeFieldWithLabel = React.createClass({
    render: function () {
        var label = (this.props.label != null) ? this.props.label: "";
        var name = (this.props.name != null) ? this.props.name: "";
        var value = (this.props.value != null) ? this.props.value: "";
        return (
            <div className="datetimepicker input-group date">
                <ControlLabel>{label}</ControlLabel>
                <DateTimeField datetime={value} name={name} onChange={this.props.onChange}/>
            </div>
        );
    }
});

const TextField = React.createClass({
    render: function() {
        var label = (this.props.label != null) ? this.props.label: "";
        var name = (this.props.name != null) ? this.props.name: "";
        var value = (this.props.value != null) ? this.props.value: "";
        return (
            <FormGroup>
                <ControlLabel>{label}</ControlLabel>
                <FormControl type="text" placeholder={label} name={name}
                             value={value} onChange={this.props.onChange}
                />
                <FormControl.Feedback />
            </FormGroup>
        );
    }
});

const TextArea = React.createClass({
    render: function() {
        var label = (this.props.label != null) ? this.props.label: "";
        var name = (this.props.name != null) ? this.props.name: "";
        var value = (this.props.value != null) ? this.props.value: "";
        return (
            <FormGroup>
                <ControlLabel>{label}</ControlLabel>
                <FormControl type="textarea" placeholder={label} name={name}
                             value={value} onChange={this.props.onChange}
                />
                <FormControl.Feedback />
            </FormGroup>
        );
    }
});

var EquipmentTestIdentificationForm = React.createClass({
    getInitialState: function () {
        return {
            loading: false,
            errors: {}
        }
    },
    render: function () {
        var data = (this.props.data != null) ? this.props.data: {};
        return (
            <div className="form-container">
                <div className="tab_row text-center">
                    <div className="col-lg-12 nopadding">
                        <div className="col-lg-4 nopadding padding-right-xs">
                            <SelectField source="test_type"
                                         label="Test type"
                                         name='test_type_id'
                                         value={data.test_type_id}
                                         onChange={this.props.onChange}/>
                        </div>
                        <div className="col-lg-4 nopadding padding-right-xs">
                            <SelectField source="user"
                                         label="Initials ?"
                                         name="initials"
                                         value={data.initials}
                                         onChange={this.props.onChange}/>
                        </div>
                        <div className="col-lg-4 nopadding pht-xs">
                            <DateTimeFieldWithLabel label="Date analyse"
                                                    name='date_analyse'
                                                    value={data.date_analyse}
                                                    onChange={this.props.onChange}/>
                        </div>
                    </div>
                    <div className="col-lg-12 nopadding">
                        <div className="col-lg-4 nopadding padding-right-xs">
                            <SelectField source="test_reason"
                                         label="Test reason"
                                         name='test_reason_id'
                                         value={data.test_reason_id}
                                         onChange={this.props.onChange}/>
                        </div>
                        <div className="col-lg-4 nopadding padding-right-xs">
                            <SelectField source="test_status"
                                         label="Status"
                                         name='status_id'
                                         value={data.status_id}
                                         onChange={this.props.onChange}/>
                        </div>
                        <div className="col-lg-g padding-right-xs">
                            <TextField label="Temperature"
                                       name='temperature'
                                       value={data.temperature}
                                       onChange={this.props.onChange}/>
                        </div>
                    </div>
                    <div className="col-lg-12 nopadding">
                        <div className="col-lg-4 nopadding padding-right-xs">
                            <TextField label="Insulating ?"
                                       name='insulating'
                                       value=""
                                       onChange={this.props.onChange}/>
                        </div>
                        <div className="col-lg-4 nopadding padding-right-xs">
                            <SelectField source="contract"
                                         label="Lab contract"
                                         name='lab_contract_id'
                                         value={data.lab_contract_id}
                                         onChange={this.props.onChange}/>
                        </div>
                        <div className="col-lg-4 nopadding padding-right-xs">
                            <TextField label="Grouping ?"
                                       name="grouping"
                                       onChange={this.props.onChange}
                                       value=""/>
                        </div>
                    </div>
                    <div className="col-lg-12 nopadding">
                        <div className="col-lg-3 nopadding padding-right-xs">
                            <SelectField source="sampling_point"
                                         label="Sampling"
                                         name='sampling_point_id'
                                         value={data.sampling_point_id}
                                         onChange={this.props.onChange}/>
                        </div>
                        <div className="col-lg-3 nopadding padding-right-xs">
                            <SelectField source="syringe"
                                         label="Syringe ?"
                                         name='syringe'
                                         value={data.syringe}
                                         onChange={this.props.onChange}/>
                        </div>
                        <div className="col-lg-3 nopadding padding-right-xs">
                            <TextField label="Test number ?"
                                       value=""
                                       name="test_number"
                                       onChange={this.props.onChange}/>
                        </div>
                        <div className="col-lg-3 nopadding padding-right-xs">
                            <TextField label="Load mva ?"
                                       value=""
                                       name="load_mva"
                                       onChange={this.props.onChange}/>
                        </div>
                    </div>
                    <div className="col-lg-12 nopadding">
                        <div className="col-lg-4 nopadding padding-right-xs">
                            <SelectField source="equipment"
                                         label="Equipment"
                                         name='equipment_id'
                                         value={data.equipment_id}
                                         onChange={this.props.onChange}/>
                        </div>
                        <div className="col-lg-4 nopadding padding-right-xs">
                            <TextField label="Order status ?"
                                       value=""
                                       name="order_status"
                                       onChange={this.props.onChange}/>
                        </div>
                        <div className="col-lg-2 nopadding padding-right-xs">
                            <SelectField source="lab"
                                         label="Lab"
                                         name='lab_id'
                                         value={data.lab_id}
                                         onChange={this.props.onChange}/>
                        </div>
                        <div className="col-lg-2 nopadding padding-right-xs">
                            <DateTimeFieldWithLabel label="Lab date ?"
                                                    name='lab_date'
                                                    value={data.lab_date}
                                                    onChange={this.props.onChange} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var EquipmentTestRepairForm = React.createClass({
    render: function () {
        var data = (this.props.data != null) ? this.props.data: {};
        return (
            <div className="tab_row">
                <div className="col-lg-12 nopadding">
                    <div className="col-lg-6 nopadding padding-right-xs">
                        <TextArea label="Repair description"
                                  name='repair_description'
                                  value={data.repair_description}
                                  onChange={this.props.onChange}/>
                    </div>
                    <div className="col-lg-6 nopadding ">
                        <TextArea label="Remark"
                                  name='remark'
                                  value={data.remark}
                                  onChange={this.props.onChange}/>
                    </div>
                </div>
                <div className="col-lg-12 nopadding">
                    <div className="col-lg-6 nopadding padding-right-xs">Sample ?
                        <FormControl type="text" value=""/>
                    </div>
                    <div className="col-lg-6 nopadding">
                        <DateTimeFieldWithLabel label="Repair date"
                                                name='lab_date'
                                                value={data.repair_date}
                                                onChange={this.props.onChange} />
                    </div>
                </div>
            </div>
        );
    }
});

var EquipmentTestDiagnosisForm = React.createClass({
    getInitialState: function () {
        return {
            loading: false
        }
    },
    render: function () {
        return (
            <form className="" method="post" action="#">
                <div className="tab_row">
                    <div className="col-lg-12 nopadding">
                        <div className="col-lg-6 nopadding padding-right-xs">Diagnosis
                            <FormControl componentClass="textarea" placeholder="textarea" value=""/>
                        </div>
                        <div className="col-lg-6 nopadding ">Recommendations
                            <FormControl componentClass="textarea" placeholder="textarea" value=""/>
                        </div>
                    </div>
                    <div className="col-lg-12 nopadding">Predefined diag
                        <FormControl type="text" value=""/>
                    </div>
                    <div className="col-lg-12 nopadding">Predefined rec
                        <FormControl type="text" value=""/>
                    </div>
                    <div className="col-lg-12 nopadding">
                        <div className="col-lg-9 nopadding padding-right-xs">Date
                            <div className="datepicker input-group date">
                                <DateTimeField datetime=""/>
                            </div>
                        </div>
                        <div className="col-lg-3 nopadding">
                            <label> </label>
                            <button type="button" className="btn btn-default">Schedule as task</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
});

var EquipmentTestEqDiagnosisForm = React.createClass({
    getInitialState: function () {
        return {
            loading: false,
        }
    },
    render: function () {
        return (
            <form className="" method="post" action="#">
                <div className="tab_row">
                    <div className="col-lg-12 nopadding">Diagnosis
                        <FormControl componentClass="textarea" placeholder="textarea" value=""/>
                    </div>
                    <div className="col-lg-12 nopadding">Indicator
                        <FormControl type="text" value=""/>
                    </div>
                    <div className="col-lg-12 nopadding">Condition
                        <FormGroup>
                            <Checkbox inline>
                                {/*{this.state.condition.value}*/}
                            </Checkbox>
                        </FormGroup>
                    </div>
                </div>
            </form>
        );
    }
});

var TestValuesForm = React.createClass({
    render: function () {
        if (this.props.testType == null) {
            return (<div></div>);
        }
        var tableName = this.props.testType.test_table_name;
        console.log("Test table name: " + tableName);
        switch (tableName) {
            case "bushing_test":
                return (<NewBushingTestForm testResultId={this.props.testResultId}
                                            tableName={tableName}/>);
            case "winding_test":
                return (<WindingTestForm testResultId={this.props.testResultId}
                                         tableName={tableName}/>);
            case "insulation_resistance_test":
                return (<NewInsulationResistanceTestForm testResultId={this.props.testResultId}
                                                         tableName={tableName}/>);
            case "visual_inspection_test":
                return (<VisualTestForm testResultId={this.props.testResultId}
                                        tableName={tableName}/>);
            case "winding_resistance_test":
                return (<NewWindingResistanceTestForm testResultId={this.props.testResultId}
                                                      tableName={tableName}/>);
            case "polymerisation_degree_test":
                return (<PolymerisationDegreeTestForm testResultId={this.props.testResultId}
                                                      tableName={tableName}/>);
            case "transformer_turn_ratio_test":
                return (<NewTransformerTestForm testResultId={this.props.testResultId}
                                                tableName={tableName}/>);
            case "dissolved_gas_test":
                return (<NewDissolvedGasForm testResultId={this.props.testResultId}
                                             tableName={tableName}/>);
            case "water_test":
                return (<WaterTestForm testResultId={this.props.testResultId}
                                       tableName={tableName}/>);
            case "furan_test":
                return (<NewFuranTestForm testResultId={this.props.testResultId}
                                          tableName={tableName}/>);
            case "inhibitor_test":
                return (<NewInhibitorTestForm testResultId={this.props.testResultId}
                                              tableName={tableName}/>);
            case "pcb_test":
                return (<NewPcbTestForm testResultId={this.props.testResultId}
                                        tableName={tableName}/>);
            case "fluid_test":
                return (<NewFluidTestForm testResultId={this.props.testResultId}
                                          tableName={tableName}/>);
            case "particle_test":
                return (<NewParticleTestForm testResultId={this.props.testResultId}
                                             tableName={tableName}/>);
            case "metals_in_oil_test":
                return (<MetalsInOilTestForm testResultId={this.props.testResultId}
                                             tableName={tableName}/>);
            default:
                return (<div></div>);
        }
    }
});

var EquipmentTestForm = React.createClass({
    getInitialState: function () {
        return {
            loading: false,
            csrf_token: 'not set',
            fields: ['test_type_id', 'test_reason_id',
                     'status_id', 'temperature', 'lab_contract_id',
                     'sampling_point_id', 'equipment_id', 'lab_id',
                     'remark', 'repair_description'],
            errors: {},
            data: null
        }
    },

    _save: function () {
        var fields = this.state.fields;
        var data = {test_result_id: this.props.selectedRowId};
        var url = '/api/v1.0/test_result/';
        var type = 'POST';
        for (var i = 0; i < fields.length; i++) {
            var key = fields[i];
            data[key] = this.state.data[key];
        }
        if ('id' in this.state.data) {
            url += this.state.data['id'];
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
        var xhr = this._save();
        xhr.done(this._onSuccess)
            .fail(this._onError)
            .always(this.hideLoading)
    },

    hideLoading: function () {
        this.setState({loading: false});
    },

    _onSuccess: function (data) {
        // this.refs.eqtype_form.getDOMNode().reset();
        // this.setState(this.getInitialState());
        // show success message
        alert('Saved');
    },

    _onError: function (data) {
        var message = "Failed to create";
        var res = data.responseJSON;
        if (res.message) {
            message = data.responseJSON.message;
        }
        if (res.errors) {
            this.setState({
                errors: res.errors
            });
        }
    },

    _onChange: function (e) {
        console.log('onChange');
        console.log(e);
        var data = (this.state.data != null) ? this.state.data: {};
        if (e.target.type == 'checkbox') {
           data[e.target.name] = e.target.checked;
        } else {
           data[e.target.name] = e.target.value;
        }
        this.setState({data: data});
    },

    _validate: function () {
        var errors = {};
        // if(this.state.username == "") {
        //   errors.username = "Username is required";
        // }
        return errors;
    },

    _formGroupClass: function (field) {
        var className = "form-group ";
        if (field) {
            className += " has-error"
        }
        return className;
    },

    componentDidMount: function () {
        this.serverRequest = $.get('/api/v1.0/test_result/' + this.props.selectedRowId, function (result) {
            this.setState({data: (result['result'])});
        }.bind(this), 'json');
    },

    render: function () {
        var data = (this.state.data != null) ? this.state.data: {};
        return (
            <div>
                <form method="post" action="#" onSubmit={this._onSubmit} onChange={this._onChange}>
                    <input type="hidden" value={this.state.csrf_token}/>
                    <div className="maxwidth padding-top-lg margin-bottom-xs">
                        <ul id="tabs" className="nav nav-tabs " data-tabs="tabs">
                            <li className="active"><a href="#tabs-1" data-toggle="tab"> Identification </a></li>
                            <li><a href="#tabs-2" data-toggle="tab"> Test repair notes </a></li>
                            <li><a href="#tabs-3" data-toggle="tab"> Records diagnostic </a></li>
                            <li><a href="#tabs-4" data-toggle="tab"> Diagnosis and recommendations </a></li>
                            <li><a href="#tabs-5" data-toggle="tab"> Test values </a></li>
                        </ul>
                        <div id="my-tab-content" className="tab-content col-lg-12 nopadding">
                            <div id="tabs-1" role="tabpanel" className="tab-pane active ">
                                <EquipmentTestIdentificationForm data={data}
                                                                 onChange={this._onChange}/>
                            </div>
                            <div id="tabs-2" role="tabpanel" className="tab-pane">
                                <EquipmentTestRepairForm data={data}
                                                         onChange={this._onChange}/>
                            </div>
                            <div id="tabs-3" role="tabpanel" className="tab-pane">
                                <EquipmentTestDiagnosisForm data={data}
                                                            onChange={this._onChange}/>
                            </div>
                            <div id="tabs-4" role="tabpanel" className="tab-pane">
                                <EquipmentTestEqDiagnosisForm data={data}
                                                              onChange={this._onChange}/>
                            </div>
                            <div id="tabs-5" role="tabpanel" className="tab-pane">
                                <TestValuesForm testResultId={this.props.selectedRowId}
                                                testType={data.test_type}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <Button bsStyle="primary"
                                    className="pull-right"
                                    onClick={this.props.handleClose}
                                    type="submit">Save changes</Button>
                            &nbsp;
                            <Button bsStyle="primary"
                                    className="pull-right margin-right-xs"
                                    onClick={this.props.handleClose}
                            >Close</Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
});

export default EquipmentTestForm;
