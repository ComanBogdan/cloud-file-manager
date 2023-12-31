import React from "react";
import FileItem from "./FileItem";

const FileList = ({ fileList }) => {
  //Mock data
  // const fileList = [
  //   {
  //     id: 1,
  //     name: "UX Principal.docx",
  //     type: "docx",
  //     size: "6272 kB",
  //     modifiedAt: "Nov 23,2020",
  //   },
  //   {
  //     id: 2,
  //     name: "Data Structure.pdf",
  //     type: "pdf",
  //     size: "672 kB",
  //     modifiedAt: "Nov 23,2022",
  //   },
  //   {
  //     id: 3,
  //     name: "smaple Image.png",
  //     type: "image",
  //     size: "400 kB",
  //     modifiedAt: "Nov 23,2023",
  //   },
  //   {
  //     id: 4,
  //     name: "React Principal.docx",
  //     type: "docx",
  //     size: "6272 kB",
  //     modifiedAt: "Nov 23,2020",
  //   },
  // ];

  return (
    <div className="bg-white mt-5 p-5 rounded-lg">
      <h2 className="text-[18px] font-bold"> Files</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 text-[13px] font-semibold border-b-[1px] pb-2 mt-3 border-gray-300 text-gray-400">
        <h2>Name</h2>
        <div className="grid grid-cols-3">
          <h2>Modified</h2>
          <h2>Size</h2>
          <h2></h2>
        </div>
      </div>
      {fileList
        ? fileList.map((item, index) => (
            <div key={"file_" + index}>
              <FileItem file={item}  />
            </div>
          ))
        : null}

      {fileList?.length == 0 ? (
        <h2 className="text-[32px] font-bold text-gray-400 text-center mt-7 mb-7">
          No files found
        </h2>
      ) : null}
    </div>
  );
};

export default FileList;
