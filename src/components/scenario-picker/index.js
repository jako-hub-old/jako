import React from 'react';
import InputPicker from './Input';
import ScnearioResults from './ScenarioResults';
import { withApi } from '../../providers';
import PropTypes from 'prop-types';
import endpoints from '../../configs/endpoints';
import { addMessage, consoleError } from '../../utils/functions';

class ScenarioPicker extends React.Component {
    state = {
        openPicker       : false,
        selectedScneario : null,
        scenarios        : [],
        loading          : true,
    };

    toggleOpen() {
        this.setState({
            openPicker : !this.state.openPicker,
        }, () => {
            if(this.state.openPicker && this.state.scenarios.length === 0) {
                this.fetchSchenarios();
            }
        });
    }

    onSelect(scenario) {
        this.setState({
            openPicker : false,
            selectedScneario : scenario,
        });
    }

    fetchSchenarios() {
        this.setState({loading : true});
        this.props.doPost(endpoints.escenarios.lista, {})
            .then(response => {
                let scenarios = [];
                const {error, error_contrlado} = response;
                if(!error && !error_contrlado) {
                    scenarios = response;
                } else {
                    addMessage("Ocurrió un error al listar los escenarios");
                }
                this.setState({loading : false, scenarios});
            })
            .catch(response => {
                this.setState({loading : false});
                consoleError("Listing escenarios: ", response);
                addMessage("Ocurrió un error al listar los escenarios");
            });
    }

    render() {
        const {
            selectedScneario,
            openPicker,
            loading,
            scenarios,
        } = this.state;
        return (
            <>
                <InputPicker 
                    selected = {selectedScneario}
                    onOpen   = {() => this.toggleOpen()}
                />
                {openPicker && (
                    <ScnearioResults
                        loading ={loading}
                        results ={scenarios}
                        onSelect={this.onSelect.bind(this)}
                        onClose = {() => this.toggleOpen()}
                        open    = {openPicker}
                     />
                )}
            </>
        );
    }
}

ScenarioPicker.propTypes = {
    doPost          : PropTypes.func,
    userCode        : PropTypes.any,
    onSelectScenario: PropTypes.func,
};

export default withApi(ScenarioPicker);