import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { getLocationsService } from "../../services/backend";
import { useEffect, useState } from "react";
import { searchRecommendationsByCountryService } from "../../services/backend";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [locations, setLocations] = useState([]);
  const [country, setCountry] = useState();
  const navigate = useNavigate();

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

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchRecommendationsByCountryService(country);
      console.log(data);
      navigate(`/recommendations/?location=${country}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSearch}>
        <InputGroup className=" mb-3 w-25 mx-auto">
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
            id="button-addon2"
            type="submit">
            Search
          </Button>
        </InputGroup>
      </Form>
    </>
  );
}

export default SearchBar;
