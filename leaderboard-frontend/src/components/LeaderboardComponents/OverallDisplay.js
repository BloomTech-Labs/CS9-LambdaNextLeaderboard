import React, {Component} from 'react'
// import {Header, Image} from "semantic-ui-react";
import {Container, Header, Image, Table} from "semantic-ui-react";

class OverallDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            huntrDefault: 32
        }
    }

    render() {
        console.log(this.props.github.FullName)
        return (
            <div>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <Header as="h4" image>
                                <Image
                                    src="https://avatars3.githubusercontent.com/u/35821558?s=460&v=4"
                                    rounded
                                    size="mini"
                                />
                                <Header.Content>{this.props.github.FullName} </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{this.props.github.commitsByUser + this.props.github.pushCount}</Table.Cell>
                        <Table.Cell>{this.state.huntrDefault}</Table.Cell>
                        <Table.Cell>{this.state.huntrDefault + this.props.github.commitsByUser + this.props.github.commitsByUser + this.props.github.pushCount}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </div>
        );
    }
}

export default OverallDisplay
