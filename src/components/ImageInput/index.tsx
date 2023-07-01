import React, { DragEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./ImageInput.module.css";

interface Props {
  onChange?: (value: String) => void;
  size?: number;
}

const ImageInput: React.FC<Props> = ({ onChange, size = 100 }) => {
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
    onChange?.(imgData);
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

  const imageStyle = useMemo(() => {
    const defaultStyles = {
      width: `${size}px`,
      height: `${size}px`,
    };

    const imageStyle = imgData
      ? {
          backgroundImage: `url(${imgData})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }
      : {};

    return { ...defaultStyles, ...imageStyle };
  }, [imgData, size]);

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
        style={imageStyle}
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
            if (e.target.files) {
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
              if (fileInputRef.current) fileInputRef.current.value = "";
              setImgData("");
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
