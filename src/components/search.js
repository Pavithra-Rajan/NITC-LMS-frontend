import * as React from 'react';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginTop:1,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#000000',
    backgroundColor:'#d9deff',
    borderRadius:16,
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 1),
     
      paddingLeft:`calc(1em + ${theme.spacing(0)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
  }));

  const originalData = [
    { user_ID: "B190632CS", ISBN: "9780262033848", book_number: 4 },
    { user_ID: "B190529CS", ISBN: "9781337627900", book_number: 2 },
    { user_ID: "B190402CS", ISBN: "9781565770393", book_number: 1 },
    { user_ID: "B190672CS", ISBN: "9780134746753", book_number: 3 },
    { user_ID: "B190539CS", ISBN: "9780262033848", book_number: 1 },
    { user_ID: "B190412CS", ISBN: "9780262033848", book_number: 5 },
    { user_ID: "B190612CS", ISBN: "9781337627900", book_number: 1 },
    { user_ID: "B190589CS", ISBN: "9780262033848", book_number: 3 },
    { user_ID: "B190502CS", ISBN: "9780133591620", book_number: 2 }
  ];
  
  export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: originalData,
        columns: [],
        searchInput: ""
      };
    }
  
    componentDidMount() {
      let columns = [
        {
          Header: "User ID",
          accessor: "user_ID",
          sortable: false,
          show: true,
          displayValue: "User ID"
        },
        {
          Header: "ISBN",
          accessor: "ISBN",
          sortable: false,
          show: true,
          displayValue: "ISBN"
        },
        {
          Header: "Book Number",
          accessor: "book_number",
          sortable: false,
          show: true,
          displayValue: "Book Number"
        }
      ];
      this.setState({ columns });
    }
  
    handleChange = (event) => {
      this.setState({ searchInput: event.target.value }, () => {
        this.globalSearch();
      });
    };
  
    globalSearch = () => {
      let { searchInput } = this.state;
      let filteredData = originalData.filter((value) => {
        return (
          value.user_ID
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          value.ISBN.toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          value.book_number
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        );
      });
      this.setState({ data: filteredData });
    };
  
    render() {
      let { data, columns, searchInput } = this.state;
      return (
        <div>
          <br />
          <Search>
            
            <SearchIcon />
            
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              name="searchInput"
            value={searchInput || ""}
            onChange={this.handleChange}
            label="Search"
            />
          </Search>
         
          <br />
          <br />
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={10}
            className="-striped -highlight"
            
          />
        </div>
      );
    }
  }