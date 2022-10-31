import { useContext } from "react";
import { CategoriesContext } from "../../Components/context/categories.context";
import Directory from "../../Components/directory/directory.component";



function Home() {
  const { directories } = useContext(CategoriesContext)
  

  console.log('home',directories)
    return (
      <div>
        <Directory directory={directories} />

       
      </div>
    );
  }
  export default Home;