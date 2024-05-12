import { useState } from "react";
import Swal from "sweetalert2";

export function FileUpload({ setFilesData, filesData, fileInputId, multiple }) {
  const [highlighted, setHighlighted] = useState(false);
  console.log("input", filesData);

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const highlight = () => {
    setHighlighted(true);
  };

  const unhighlight = () => {
    setHighlighted(false);
  };

  const handleDrop = (e) => {
    unhighlight();
    preventDefaults(e);
    const files = e.dataTransfer.files[0];
    if (files) {
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/heif",
        "image/heic",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(files.type)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hanya file PNG, JPG, dan JPEG yang diizinkan!",
        });
      } else if (files.size > maxSize) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ukuran gambar melebihi 5MB!",
        });
      } else {
        if (multiple) {
          setFilesData((prevArray) => [...prevArray, files]);
        } else {
          setFilesData(files);
        }
      }
    }
  };

  const handleInputChange = (e) => {
    preventDefaults(e);
    const files = e.target.files[0];

    if (files) {
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/heif",
        "image/heic",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(files.type)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hanya file PNG, JPG, dan JPEG yang diizinkan!",
        });
      } else if (files.size > maxSize) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ukuran gambar melebihi 5MB!",
        });
      } else {
        if (multiple) {
          setFilesData((prevArray) => [...prevArray, files]);
        } else {
          setFilesData(files);
        }
      }
    }
  };

  const handleClick = () => {
    document.getElementById(fileInputId).click();
  };

  return (
    <div>
      <div
        // id="drop-area"
        onDragEnter={highlight}
        onDragOver={(e) => {
          highlight();
          preventDefaults(e);
        }}
        onDragLeave={unhighlight}
        onDrop={handleDrop}
        className={`border-1 border-dashed rounded-md border-gray-400 px-4 h-20 flex items-center ${
          highlighted ? "bg-slate-100" : ""
        }`}
      >
        <div className="flex flex-row items-center gap-2 ">
          {multiple ? (
            filesData?.length < 1 ? (
              <>
                <button
                  onClick={handleClick}
                  className="border-1 border-solid border-gray-400 p-1 px-4 rounded-md hover:bg-slate-100"
                >
                  Pilih File
                </button>
                <p className="text-gray-400">Atau arahkan file kedalam kotak</p>
              </>
            ) : (
              <>
                <button
                  onClick={handleClick}
                  className="border-1 border-solid border-gray-400 p-1 px-4 rounded-md hover:bg-slate-100"
                >
                  Tambah File
                </button>
                <p className="text-gray-400">Atau arahkan file kedalam kotak</p>
              </>
            )
          ) : !filesData?.name ? (
            <>
              <button
                onClick={handleClick}
                className="border-1 border-solid border-gray-400 p-1 px-4 rounded-md hover:bg-slate-100"
              >
                Pilih File
              </button>
              <p className="text-gray-400">Atau arahkan file kedalam kotak</p>
            </>
          ) : (
            <>
              <button
                onClick={handleClick}
                className="border-1 border-solid border-gray-400 p-1 px-4 rounded-md hover:bg-slate-100"
              >
                Ganti File
              </button>
              <p>{filesData?.name}</p>
            </>
          )}
        </div>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          id={fileInputId}
          style={{ display: "none" }}
          onChange={handleInputChange}
        />
      </div>
      {multiple ? (
        <div className="flex flex-col">
          {filesData?.map((value, indexx) => (
            <div
              key={indexx}
              className="border-1 border-t-0 border-dashed border-gray-400 flex flex-row gap-1 px-4 items-center justify-between p-3"
            >
              <div>
                <p>{value.name}</p>
                <p className="text-xs font-light ">{value.size} KB</p>
              </div>
              <button
                onClick={() => {
                  setFilesData((prevArray) => {
                    // Create a new array without the item at the specified index
                    return prevArray.filter((_, index) => index !== indexx);
                  });
                }}
                className="fa fa-trash text-red-600"
              ></button>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      <small className=" text-gray-400">
        <i>Jenis berkas: .png / .jpg / .jpeg </i>
      </small>
    </div>
  );
}
