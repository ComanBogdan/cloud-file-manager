import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchBar from "@/components/SearchBar";
import FolderList from "@/components/Folder/FolderList";
import FileList from "@/components/File/FileList";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/Config/FirebaseConfig";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
import { UserInfoContext } from "@/context/UserInfoContext";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const db = getFirestore(app);

  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState();
  const [searchBar, setSearchBar] = useState("");
  const [fileListSearch, setFileListSearch] = useState([]);

  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { ParentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );

  //redirect to login if not in session
  useEffect(() => {
    console.log("user session", session);
    if (!session) {
      router.push("/login");
    } else {
      getFolderList();
      getFileList();
    }
    setParentFolderId(0);
  }, [session]);

  const getFolderList = async () => {
    setFolderList([]);
    const q = query(
      collection(db, "Folders"),
      where("parentFolderId", "==", 0),
      where("createBy", "==", session.user.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      setFolderList((folderList) => [...folderList, doc.data()]);
    });
  };

  const getFileList = async () => {
    setFileList([]);
    const q = query(
      collection(db, "Files"),
      where("parentFolderId", "==", 0),
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
      if (doc.data()["name"].toUpperCase().includes(searchBar.toUpperCase())) {
        setFileListSearch((fileListSearch) => [...fileListSearch, doc.data()]);
      }
    });
  }, [searchBar]);

  return (
    <>
      <div className="p-5">
        <SearchBar searchBar={searchBar} setSearchBar={setSearchBar} />
        {searchBar == "" ? (
          <>
            <FolderList folderList={folderList} />
            <FileList fileList={fileList} />
          </>
        ) : (
          <>
            <FileList fileList={fileListSearch} />
          </>
        )}
      </div>
    </>
  );
}
