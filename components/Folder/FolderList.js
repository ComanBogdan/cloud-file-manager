import React, { useContext, useState } from "react";
import FolderItem from "./FolderItem";
import { useRouter } from "next/router";
import Image from "next/image";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "@/Config/FirebaseConfig";
import { ShowToastContext } from "@/context/ShowToastContext";

const FolderList = ({ folderList, folderName, folderId, back }) => {
  //   const folderList = [
  //     {
  //       id: 1,
  //       name: "Folder 1 to Test Big Text",
  //     },
  //     {
  //       id: 2,
  //       name: "Folder 2",
  //     },
  //     {
  //       id: 3,
  //       name: "Folder 3",
  //     },
  //     {
  //       id: 4,
  //       name: "Folder 4",
  //     },
  //     {
  //       id: 5,
  //       name: "Folder 4",
  //     },
  //   ];
  const [activeFolder, setActiveFolder] = useState();
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  const router = useRouter();

  const onFolderClick = (item, index) => {
    setActiveFolder(index);
    router.push({
      pathname: "/folder/" + item.id,
      query: {
        name: item.name,
        id: item.id,
      },
    });
  };

  //delete folder

  const db = getFirestore(app);

  const folderDelete = async () => {
    console.log("delete");
    console.log(folderName);
    console.log(folderId);

    await deleteDoc(doc(db, "Folders", folderId.toString())).then((resp) => {
      router.back();
      console.log("sters");
      setShowToastMsg("Folder deleted");
    });
  };

  return (
    <div className="p-5 mt-5 bg-white rounded-lg">
      {folderName ? (
        <div className="flex items-center justify-center">
          <span
            className="cursor-pointer p-2 hover:scale-150 transition-all text-blue-400 float-left "
            onClick={() => router.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </span>
          <span className="w-full">
            <Image
              className="w-12 h-12 mr-2 float-right"
              src="/folder.png"
              alt="folder"
              width={40}
              height={40}
            />
          </span>
          <h2 className="text-[48px] font-bold mb-2">{folderName}</h2>

          <span className="w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => folderDelete()}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 ml-2 text-red-500
   hover:scale-125 transition-all  cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </span>
        </div>
      ) : null}

      <h2 className="text-[17px] font-bold items-center text-black">
        Folders
        <span className="float-right text-blue-400 font-normal text-[13px] cursor-pointer">
          View All
        </span>
      </h2>

      {folderList?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-3 gap-4 ">
          {folderList.map((item, index) => (
            <div
              onClick={() => {
                onFolderClick(item, index);
              }}
            >
              <FolderItem key={index + item.id} folder={item} />
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-[32px] font-bold text-gray-400 text-center mt-7 mb-7">
          No folders found
        </h2>
      )}
    </div>
  );
};

export default FolderList;
