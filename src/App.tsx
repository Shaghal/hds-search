// @ts-nocheck
import styles from "./App.module.css";
import SearchCard from "@Components/SearchCard";
import { useEffect, useState } from "react";
import Loading from "@Components/Loading";
import SearchPanel from "@Components/SearchPanel";

function App() {
  // * for debug
  // console.table({ API_ENV, BUCKET_NAME, MINIO_SERVER, QUERY_SERVER });
  // TODO: handle with select component
  const [rowElementsCount, setRowElementsCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    if (loading) setResultList([]);
  }, [loading]);
  return (
    <div className={styles.app}>
      <SearchPanel onChange={setResultList} onLoadingChange={setLoading} />
      <div
        className={styles.resultContainer}
        style={{
          gridTemplateColumns: `repeat(${rowElementsCount}, 1fr)`,
        }}
      >
        {loading ? (
          <div className={styles.loadingContainer}>
            <Loading size={40} />
          </div>
        ) : null}
        {resultList.map((searchItem) => (
          <SearchCard key={Math.random().toString()} {...searchItem} />
        ))}
      </div>
    </div>
  );
}

export default App;
