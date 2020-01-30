import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport }  from 'react-bootstrap-table2-toolkit';

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const columns = [{
        dataField: '_id',
        text: 'Contact ID'
    }, {
        dataField: 'age',
        text: 'Age',
        sort: true
    }, {
        dataField: 'eyeColor',
        text: 'Eye Color'
    },  {
        dataField: 'name',
        text: 'Name'
    }, {
        dataField: 'gender',
        text: 'Gender'
    }, {
        dataField: 'company',
        text: 'Company'
    }, {
        dataField: 'email',
        text: 'Email'
    }, {
        dataField: 'phone',
        text: 'Phone'
    }, {
        dataField: 'address',
        text: 'Address'
    }]

export default class ContactCard extends React.Component {

    render() {
        return (
            <ToolkitProvider
                bootstrap4
                keyField='_id'
                data={ this.props.data }
                columns={ columns }
                search
                >
                {
                    props => (
                    <div>
                        <div>
                        <h3>Search for a specific person:</h3>
                        <SearchBar { ...props.searchProps } />
                        </div>
                        <hr />
                        <BootstrapTable
                        { ...props.baseProps }
                        />
                        <ExportCSVButton { ...props.csvProps }>Export result as CSV</ExportCSVButton>
                    </div>
                    )
                }
            </ToolkitProvider>
        );
    }
}
