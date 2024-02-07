import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { getLocationsService } from "../../services/backend";
import { useEffect, useState } from "react";

function SearchBar() {
  const [locations, setLocations] = useState([]);
  const [country, setCountry] = useState();

  useEffect(() => {
    const loadingLocations = async () => {
      try {
        const data = await getLocationsService();

        setLocations(data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    loadingLocations();
  }, []);

  const handleSearch = () => {
    console.log(country);
  };

  return (
    <>
      <InputGroup
        className=" mb-3 w-75 mx-auto"
        onSubmit={handleSearch}>
        <Form.Select
          required
          name="country"
          id="country"
          onChange={(e) => setCountry(e.target.value)}>
          {locations.map((pais) => (
            <option
              key={pais.id}
              value={pais.id}>
              {pais.country}
            </option>
          ))}
        </Form.Select>
        <Button
          variant="outline-primary"
          id="button-addon2">
          Search
        </Button>
      </InputGroup>
    </>
  );
}

export default SearchBar;
