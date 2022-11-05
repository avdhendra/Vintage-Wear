import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Directory from "../../Components/directory/directory.component";
import Spinner from "../../Components/spinner/spinner";
import DirectoryJSON from "../../DirectoryJSON";
import {
  addCollectionAndDocument,
  
} from "../../firebase/firebase.utils";
//import { setDirectoryItem } from "../../Slice/categoriesSlice";
import { fetchDirectory } from "../../Slice/directoriesSlice";
import { directoriesSlice, selectDirectoriesLoading } from "../../Slice/memoized_selectors/directory.selector";

function Home() {
  const dispatch = useDispatch();
  // const { directories } = useContext(CategoriesContext)
  const directories = useSelector(directoriesSlice);
  const isLoading=useSelector(selectDirectoriesLoading)
  useEffect(() => {
    addCollectionAndDocument("directory", DirectoryJSON);

    // const getDirectoryMap = async () => {
    //   const directory = await getDirectoryDocument();
    //   console.log("zer", directory);
    //   dispatch(setDirectoryItem(directory));
    // };
    //getDirectoryMap();

dispatch(fetchDirectory())


  }, [dispatch]);

  console.log("home", directories);
  return (
    <div>
      {isLoading === "loading" ? (
        <Spinner />
      ) : (
        <Directory directory={directories} />
      )}
    </div>
  );
}
export default Home;
