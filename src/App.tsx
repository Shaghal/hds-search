// @ts-nocheck
import ImageInput from "@Components/ImageInput";
import TextInput from "@Components/TextInput";
import styles from "./App.module.css";
import SearchCard from "@Components/SearchCard";
import { useState } from "react";
import { SearchCardType } from "@Components/SearchCard/types";
import Loading from "@Components/Loading";


const API_ENV = process.env.REACT_APP_API_ENV;
const BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;
const MINIO_SERVER = process.env.REACT_APP_MINIO_SERVER;
const QUERY_SERVER = process.env.REACT_APP_QUERY_SERVER;
const API_VENDOR = process.env.REACT_APP_API_VENDOR;
// ******************* //
const IMAGE_BASE_URL = `${MINIO_SERVER}/${BUCKET_NAME}/`;

function App() {
  // * for debug
  // console.table({ API_ENV, BUCKET_NAME, MINIO_SERVER, QUERY_SERVER });
  // TODO: handle with select component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowElementsCount, setRowElementsCount] = useState(8);
  const [textQuery, setTextQuery] = useState("");
  const [imageQuery, setImageQuery] = useState<String>("");
  const [resultList, setResultList] = useState<SearchCardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  function submitData() {
    if (textQuery || imageQuery) {
      setIsLoading(true);
      fetch(`${QUERY_SERVER}${imageQuery ? "/b64" : ""}/_search`, {
        method: "POST",
        body: JSON.stringify({
          limit: 20,
          // collection: "dartil_search",
          text_query: textQuery,
          ...(imageQuery && { image_query: imageQuery.split(",")[1] }),
          vendor: API_VENDOR,
          environment: API_ENV,
          domain: "bigG",
          payload: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      })
        .then((response) => response.json())
        .then(({ result }) => {
          setResultList(
            result.map((item) => {
              item.payload.image = IMAGE_BASE_URL + item.payload.image;
              return item;
            })
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <div className={styles.app}>
      <div className={styles.ImageInput}>
        <ImageInput
          onChange={(image) => {
            setImageQuery(image);
          }}
        />
      </div>
      <div className={styles.formContainer}>
        <TextInput
          onChange={(e) => {
            setTextQuery(e.target.value);
          }}
          placeholder="متن جستجو"
        />
        {/* <TextInput
          onChange={(e) => {
            setRowElementsCount(Number(e.target.value) || 0);
          }}
          defaultValue={rowElementsCount}
          placeholder="تعداد آیتم در هر ردیف"
        /> */}
        <button className={styles.searchButton} onClick={submitData}>
          جستجو
        </button>
      </div>
      <div
        className={styles.resultContainer}
        style={{
          gridTemplateColumns: `repeat(${rowElementsCount}, 1fr)`,
        }}
      >
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Loading size={40} />
          </div>
        ) : null}
        {resultList.map((searchItem) => (
          <SearchCard key={searchItem.id} {...searchItem} />
        ))}
      </div>
    </div>
  );
}

export default App;
