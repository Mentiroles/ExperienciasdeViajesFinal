import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function SearchBar() {
    return (
        <>
        <InputGroup className=" mb-3 w-75 mx-auto">
        <Form.Control
          type="search"
          placeholder="Search by country..."
          aria-label="Search by country..."
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-primary" id="button-addon2">
          Search
        </Button>
      </InputGroup>
         
        </>
    )
}   

export default SearchBar
