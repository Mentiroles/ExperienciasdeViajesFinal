import { Carousel } from "react-bootstrap";
import { LuTreePine } from "react-icons/lu";
import { FaStreetView } from "react-icons/fa";
import { RiTreeFill } from "react-icons/ri";
function Category() {
  return (
    <Carousel
      className="mt-5"
      slide={false}>
      <Carousel.Item>
        <LuTreePine style={{ width: "100%", height: "auto" }} />
        <Carousel.Caption>
          <h3 className="text-primary">Beach</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <FaStreetView style={{ width: "100%", height: "auto" }} />
        <Carousel.Caption>
          <h3 className="text-primary">Nature</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <RiTreeFill style={{ width: "100%", height: "auto" }} />
        <Carousel.Caption>
          <h3 className="text-primary">Historic</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Category;
