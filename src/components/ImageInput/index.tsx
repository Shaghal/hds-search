import React, { DragEvent, useEffect, useRef, useState } from "react";
import styles from "./ImageInput.module.css";

interface Props {
  onChange?: (value: String) => void;
}

const ImageInput: React.FC<Props> = ({ onChange }) => {
  const [imgData, setImgData] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  useEffect(() => {
    if (imgData && onChange) {
      onChange(imgData);
    }
  }, [imgData, onChange]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgData(reader.result as string);
    });
    reader.readAsDataURL(file);
  };

  // @ts-ignore
  const onClickDropzone = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div
        onClick={onClickDropzone}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onDrop={onDrop}
        className={[
          styles.uploadZone,
          ...[!imgData && styles.uploadZoneBackground],
        ].join(" ")}
        style={
          imgData
            ? {
                backgroundImage: `url(${imgData})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        {!imgData && (
          <span className={styles.dropZoneText}>
            عکس خود را با کلیک یا انداختن آن در این محل بارگذاری نمایید
          </span>
        )}
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
          style={{ display: "none" }}
        />
        {imgData && (
          <button
            className={styles.clearImage}
            onClick={(e) => {
              e.stopPropagation();
              if (fileInputRef.current?.value) {
                fileInputRef.current.value = "";
                setImgData("");
              }
            }}
          >
            حذف
          </button>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default ImageInput;
