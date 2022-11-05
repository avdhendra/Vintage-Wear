import React from "react";
import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

function Directory({ directory }) {

  return (
    <div >
      {Object.keys(directory).map((name) => {
        const directoryItem = directory[name];

        return (
          <div key={directory.id} className="categories-container">
            {directoryItem.map((direct) => {
              return <DirectoryItem key={direct.id} directory={direct} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Directory;
