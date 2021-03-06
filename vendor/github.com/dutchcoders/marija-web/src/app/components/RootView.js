import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, Record, TableView, ConfigurationView, Histogram, Queries, Graph, GraphPixi, Pane, Icon, Nodes } from './index';
import { ErrorStatus } from '../modules/status/index';


class RootView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentNode: null
        };
    }

    handleChange(e) {
        this.setState({selectValue: e.target.value});
    }

    handleMouseOver(node) {
        this.setState({currentNode: node});
    }


    render() {
        const { items, panes, dispatch, node, nodes, headerHeight } = this.props;

        return (
            <div className="container-fluid">
                <Header/>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="row" style={{'height': 'calc(100vh - ' + headerHeight + 'px)'}}>
                            <GraphPixi
                                className="graph"
                                handleMouseOver={ () => this.handleMouseOver() }
                            />
                        </div>
                    </div>
                </div>

                <Pane
                    name="Configuration"
                    handle="configuration"
                    panes={panes}
                    dispatch={dispatch}
                    icon="ion-ios-arrow-forward"
                    top={headerHeight}>
                    <ConfigurationView ref="configurationView"/>
                </Pane>

                <Pane
                    name="Selected nodes"
                    description={node.length + '/' + nodes.length}
                    handle="nodes"
                    panes={panes}
                    dispatch={dispatch}
                    icon="ion-ios-arrow-back"
                    top={headerHeight}>
                    <Nodes />
                </Pane>

                <Pane name="Table" description={'data for ' + node.length + ' selected nodes'} handle="table" panes={panes} dispatch={dispatch} icon="ion-ios-arrow-back">
                    <TableView />
                </Pane>

                <Pane name="Histogram" handle="histogram" panes={panes} dispatch={dispatch} icon="ion-ios-arrow-up">
                    <Histogram
                        width="1600"
                        height="200"
                        className="histogram"
                    />
                </Pane>
            </div>
        );
    }
}

const select = (state, ownProps) => {
    return {
        ...ownProps,
        errors: state.entries.errors,
        items: state.entries.items,
        node: state.entries.node,
        nodes: state.entries.nodes,
        links: state.entries.links,
        panes: state.utils.panes,
        headerHeight: state.utils.headerHeight
    };
};
export default connect(select)(RootView);
