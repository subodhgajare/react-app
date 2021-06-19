import querystring from "query-string"
import { useEffect, useState } from "react"
import CakeList from "./CakeList";
function Search(props) {
  let [searchKey, setSearchKey] = useState('');
  useEffect(() => {
    let search = querystring.parse(props.location.search);

    if (search.q !== undefined && search.q !== '') {
      setSearchKey(search.q);
    }
  }, [props.location.search])

  return (
    <CakeList search={searchKey} />
  )
}
export default Search