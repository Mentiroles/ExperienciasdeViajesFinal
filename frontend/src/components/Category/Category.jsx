import { useEffect, useState } from "react";
import { getCategoriesService } from "../../services/backend";
import Card from "react-bootstrap/Card";
import "./Category.css";

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
    <>
      <div
        className="recommendation-list mt-5 mx-auto"
        style={{ width: "80%" }}>
        {categories.map((category) => (
          <Card
            key={category.id}
            className="mb-3mx-auto mt-5 "
            style={{ width: "18rem", cursor: "pointer" }}>
            <Card.Img
              src={`http://localhost:3000/photos/categories/${category.category}.svg`}
              alt={category.category}
              className="card-img"
            />
            <Card.Body className="text-center">
              <Card.Title className="text-primary">
                {category.category}{" "}
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Category;
