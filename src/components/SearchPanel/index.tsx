import ImageInput from "@Components/ImageInput";
import TextInput from "@Components/TextInput";
import styles from "./SearchPanel.module.css";
import { useEffect, useState } from "react";
import { SearchCardType } from "@Components/SearchCard/types";

const API_ENV = process.env.REACT_APP_API_ENV;
const BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;
const MINIO_SERVER = process.env.REACT_APP_MINIO_SERVER;
const QUERY_SERVER = process.env.REACT_APP_QUERY_SERVER;
const API_VENDOR = process.env.REACT_APP_API_VENDOR;
// ******************* //
const IMAGE_BASE_URL = `${MINIO_SERVER}/${BUCKET_NAME}/`;

interface Props {
  onChange?: (v: any) => void;
  onError?: (e?: Error) => void;
  onLoadingChange?: (l: boolean) => void;
}

export default function SearchPanel({
  onChange,
  onError,
  onLoadingChange,
}: Props) {
  const [textQuery, setTextQuery] = useState("");
  const [imageQuery, setImageQuery] = useState<String>("");
  const [loading, setLoading] = useState(false);

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      submitData();
    }
  };

  function submitData() {
    if (textQuery || imageQuery) {
      setLoading?.(true);
      fetch(`${QUERY_SERVER}${imageQuery ? "/b64" : ""}/_search`, {
        method: "POST",
        body: JSON.stringify({
          limit: 20,
          // collection: "dartil_search",
          text_query: imageQuery ? "" : textQuery,
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
        .then(({ result }: { result: SearchCardType[] }) => {
          const finalResults = result.map((item) => {
            let tempBaseUrl = `${MINIO_SERVER}/${BUCKET_NAME}/`;
            // TODO: remove this
            if (item.payload.image.includes("-")) {
              tempBaseUrl = `${MINIO_SERVER}/dartil-demo/`;
            }
            item.payload.image = tempBaseUrl + item.payload.image;
            return item;
          });
          onChange?.(finalResults);
        })
        .catch(onError)
        .finally(() => {
          setLoading?.(false);
        });
    }
  }
  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading]);

  return (
    <div className={styles.container}>
      <div className={styles.ImageInput}>
        <ImageInput
          onChange={(image) => {
            setImageQuery(image);
          }}
          size={150}
        />
      </div>
      <div className={styles.formContainer}>
        <TextInput
          onChange={(e) => {
            setTextQuery(e.target.value);
          }}
          placeholder="متن جستجو"
          onKeyDown={handleKeyPress}
        />
        {/* <TextInput
          onChange={(e) => {
            setRowElementsCount(Number(e.target.value) || 0);
          }}
          defaultValue={rowElementsCount}
          placeholder="تعداد آیتم در هر ردیف"
        /> */}
        <button
          disabled={loading}
          className={styles.searchButton}
          onClick={submitData}
        >
          جستجو
        </button>
      </div>
    </div>
  );
}
