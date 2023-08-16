import { app } from "@/Config/FirebaseConfig";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ShowToastContext } from "@/context/ShowToastContext";

const UploadFileModal = ({ closeModal }) => {
  const { data: session } = useSession();

  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);

  const docId = Date.now();
  const db = getFirestore(app);
  const storage = getStorage(app);

  //upload file to database
  const onFileUpload = async (file) => {
    console.log(file);

    const fileRef = ref(storage, "file" + file.name);

    //upload file to storage
    uploadBytes(fileRef, file)
      .then((snapshot) => {
        console.log("upload a blob or file");
      })
      .then((resp) => {
        getDownloadURL(fileRef).then(async (downloadURL) => {
          console.log("file avaialble at " + downloadURL);

          //upload information to database
          await setDoc(doc(db, "Files", docId.toString()), {
            name: file.name,
            type: file.name.split(".")[1],
            id: docId,
            size: file.size,
            modifiedAt: file.lastModified,
            createdBy: session.user.email,
            parentFolderId: parentFolderId,
            imageUrl: downloadURL,
          });

          //closemodal
          closeModal();

          //toastmsg
          setShowToastMsg("File uploaded");
        });
      });
  };

  return (
    <div>
      <form method="dialog" className="modal-box   bg-white w-[460px]">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div className=" flex justify-center w-full p-6">
          <label
            className="flex flex-col items-center justify-center h-64 w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 
           hover:bg-gray-100 "
          >
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>

            <p className=" mb-2">
              <span className="font-bold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => onFileUpload(e.target.files[0])}
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default UploadFileModal;
