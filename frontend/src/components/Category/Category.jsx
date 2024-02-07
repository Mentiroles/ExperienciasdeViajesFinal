import "./Category.css";
function Category() {
  return (
    <div
      className="container d-flex flex-column align-items-center"
      style={{ marginTop: "100px" }}>
      <h2 className="lead text-primary ">
        Select a category to see recommendations based on that category
      </h2>
      <form>
        <input
          type="radio"
          name="fancy"
          autofocus
          value="clubs"
          id="clubs"
        />
        <input
          type="radio"
          name="fancy"
          value="hearts"
          id="hearts"
        />
        <input
          type="radio"
          name="fancy"
          value="spades"
          id="spades"
        />
        <input
          type="radio"
          name="fancy"
          value="diamonds"
          id="diamonds"
        />
        <label for="clubs">&#9827; Clubs</label>
        <label for="hearts">&#9829; Hearts</label>
        <label for="spades">&#9824; Spades</label>
        <label for="diamonds">&#9830; Diamonds</label>

        <div class="keys">Use left and right keys to navigate</div>
      </form>
    </div>
  );
}

export default Category;
