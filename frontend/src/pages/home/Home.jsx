import SearchBar from "../../components/SearchBar/SearchBar";
import Category from "../../components/Category/Category";
function Home() {
  return (
    <>
      <div className="container">
        <section className="p-5">
          <h2 className="text-center mt-5 mb-5 text-primary">
            Descubre nuevos destinos y comparte tus experiencias!
          </h2>

          <SearchBar />
        </section>
        <Category />
      </div>
    </>
  );
}

export default Home;
