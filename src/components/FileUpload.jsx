import { useState } from "react";

export function FileUpload({ setFilesData, filesData, fileInputId }) {
  const [highlighted, setHighlighted] = useState(false);

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
    console.log("File uploaded:", files);
    setFilesData(files);
  };

  const handleInputChange = (e) => {
    preventDefaults(e);
    const files = e.target.files[0];
    setFilesData(files);
    console.log(files);
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
          {!filesData?.name ? (
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
      <small className=" text-gray-400">
        <i>Jenis berkas: .png / .jpg </i>
      </small>
    </div>
  );
}
