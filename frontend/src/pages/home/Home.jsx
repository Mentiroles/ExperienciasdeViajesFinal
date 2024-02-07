import SearchBar from "../../components/SearchBar/SearchBar";
import Recommendations from "../recommendations/Recommendations";
// import Category from "../../components/Category/Category";
function Home() {
  return (
    <>
      <h2 className="text-center mt-5 mb-5 text-primary">
        Descubre nuevos destinos y comparte tus experiencias!
      </h2>
      <SearchBar />
      {/* <Category /> */}
      <Recommendations />
      
    </>
  );
}

export default Home;
