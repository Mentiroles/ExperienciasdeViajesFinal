import { useEffect, useState } from "react";
import { getCategoriesService } from "../../services/backend";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import "./Category.css";
import { Link } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadingCategories = async () => {
      try {
        const data = await getCategoriesService();
        setCategories(data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    loadingCategories();
  }, []);

  if (!categories) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recommendation-list d-flex justify-content-center">
      <div className="d-none d-md-block">
        <div className="categories-list">
          {categories.map((category) => (
            <div
              key={category.id}
              className="col-md-4">
              <Card
                className="mb-3 mx-auto mt-5 border-0"
                style={{ width: "18rem", cursor: "pointer" }}>
                <Card.Img
                  src={`http://localhost:3000/photos/categories/${category.category}.svg`}
                  alt={category.category}
                  className="card-img"
                />
                <Card.Body className="text-center">
                  <Link to={`/recommendations/?category=${category.category}`}>
                    <Card.Title className="text-primary">
                      {category.category}
                    </Card.Title>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="d-md-none">
        <Carousel slide={false}>
          {categories.map((category) => (
            <Carousel.Item key={category.id}>
              <Card
                className="mb-3 mx-auto mt-5 border-0"
                style={{ width: "18rem", cursor: "pointer" }}>
                <Card.Img
                  src={`http://localhost:3000/photos/categories/${category.category}.svg`}
                  alt={category.category}
                  className="card-img"
                />
                <Card.Body className="text-center">
                  <Link to={`/recommendations/?category=${category.category}`}>
                    <Card.Title className="text-primary">
                      {category.category}
                    </Card.Title>
                  </Link>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Category;
