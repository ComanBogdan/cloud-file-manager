import { app } from "@/Config/FirebaseConfig";
import FileList from "@/components/File/FileList";
import FolderList from "@/components/Folder/FolderList";
import SearchBar from "@/components/SearchBar";
import UserInfo from "@/components/Storage/UserInfo";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
import { ShowToastContext } from "@/context/ShowToastContext";
import { UserInfoContext } from "@/context/UserInfoContext";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const FolderDetails = () => {
  const router = useRouter();
  const { name, id } = router.query;
  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );
  const { data: session } = useSession();
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);

  const {userInfo, setUserInfo} = useContext(UserInfoContext);

  const [searchBar, setSearchBar] = useState("");

  const db = getFirestore(app);
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [fileListSearch, setFileListSearch] = useState([]);

  useEffect(() => {
    setParentFolderId(id);
    if (session) {
      getFolderList();
      getFileList();
    }
  }, [id, session, showToastMsg]);

  const getFolderList = async () => {
    setFolderList([]);
    const q = query(
      collection(db, "Folders"),
      where("createBy", "==", session.user.email),
      where("parentFolderId", "==", id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());

      setFolderList((folderList) => [...folderList, doc.data()]);
    });

    console.log(folderList);
  };

  const getFileList = async () => {
    setFileList([]);
    const q = query(
      collection(db, "Files"),
      where("parentFolderId", "==", id),
      where("createdBy", "==", session.user.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      setFileList((fileList) => [...fileList, doc.data()]);
    });
  };

  useEffect(() => {
  
    setFileListSearch([]);

    userInfo.forEach((doc) => {
      if(doc.data()["name"].toUpperCase().includes(searchBar.toUpperCase())){
       
        setFileListSearch((fileListSearch) => [...fileListSearch, doc.data()]);
      }
      
    })
  }, [searchBar])
  

  console.log(searchBar);
  console.log(fileList)

  return (
    <div className="p-5">
      <SearchBar searchBar={searchBar} setSearchBar={setSearchBar} />

      {searchBar == "" ? (
        <>
          <FolderList folderList={folderList} folderName={name} folderId={id} back={true} />
          <FileList fileList={fileList} />
        </>
      ) : 
        
        <>
        <FileList fileList={fileListSearch} />
        </>
      }
    </div>
  );
};

export default FolderDetails;
