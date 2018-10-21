import * as React from 'react';
import { render } from 'react-dom';

export class ExperiencesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: []
        };
    }

    handleAddRow = () => {
        this.setState((prevState, props) => {
        const table = { content: "hello this is a new row!" };
            return { tables: [...prevState.tables, table] };
        });
    };

    handleRemoveRow = () => {
        this.setState((prevState, props) => {
            return { rows: prevState.rows.slice(1) };
        });
    };

    public render() {
        return (
            <>
                <div>
                    <table>
                    <tbody>
                        {this.state.tables.map(table => (
                        <tr>
                            <td>{row.content}</td>
                        </tr>
                        ))}
                        <tr>
                        <td className="" onClick={this.handleAddRow}>
                            (+)
                        </td>
                        {Boolean(this.state.tables.length) && (
                            <td onClick={this.handleRemoveRow}>(-)</td>
                        )}
                        </tr>
                    </tbody>
                    </table>
                </div>
            </>
        );
    }
}
