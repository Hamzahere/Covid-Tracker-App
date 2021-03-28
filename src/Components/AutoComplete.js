import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AutoComplete() {
  // console.log(getSearchResults);
  //   return <div>autocomolete</div>;

  let [searchTerm, updateSearchTerm] = useState([]);
  let [allResults, allResultsUpdate] = useState();

  function filterList(updatedSearch, e) {
    const newarr = updatedSearch.filter((result) =>
      result.match(new RegExp(e, "gi"))
    );
    console.log(newarr);
    updateSearchTerm(newarr);
  }

  function deleteFilterList(e) {
    //console.log("value of ");
    const arr = allResults;
    console.log(arr);
    const newarr = arr.filter((result) =>
      result.match(new RegExp(e.target.value, "gi"))
    );
    console.log(newarr);
    updateSearchTerm(newarr);
  }
  useEffect(() => {
    async function getSearchResults() {
      let searchResultsResponse = await axios.get(
        `https://coronavirus-19-api.herokuapp.com/countries`
      );
      console.log(searchResultsResponse.data[0]);
      allResultsUpdate(Object.keys(searchResultsResponse.data[0]));
      updateSearchTerm(Object.keys(searchResultsResponse.data[0]));
      console.log("after initial state set", searchResultsResponse);

      console.log("copy of stste", allResults);
    }

    getSearchResults();
  }, []);

  return (
    <section className="search">
      <h1>
        Search {searchTerm ? `results for: ${searchTerm["country"]}` : null}
      </h1>

      <div>
        <input
          type="text"
          placeholder="Enter the Country Name"
          // onChange={(e) => {
          //   if (e.keyCode == "8") {
          //     console.log("delete");
          //     updateSearchTerm(searchResults);
          //     filterList(searchTerm, e.target.value);
          //   } else {
          //     console.log("else");
          //     console.log(e.keyCode);
          //     filterList(searchTerm, e.target.value);
          //   }
          // }}
          onKeyUp={(e) => {
            if (e.keyCode == "8") {
              console.log("delete");
              console.log("value of input ondelete", e.target.value);
              console.log(allResults);
              deleteFilterList(e);
              //updateSearchTerm(allResults);

              // updateSearchTerm(allResults, () => {
              //   filterList(searchTerm, e.target.value);
              // });
              // filterList(searchTerm, e.target.value);
            } else {
              console.log("else");
              console.log(e.keyCode);
              filterList(searchTerm, e.target.value);
            }
          }}
        />
        <ul>
          {searchTerm.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
