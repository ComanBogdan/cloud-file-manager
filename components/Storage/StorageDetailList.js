import React, { useContext, useEffect, useState } from "react";
import StorageDetailItem from "./StorageDetailItem";
import { UserInfoContext } from "@/context/UserInfoContext";
import { UserMemoryContext } from "@/context/UserMemoryContext";

const StorageDetailList = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { userMemory, setUserMemory } = useContext(UserMemoryContext);

  const [imageCount, setImageCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  let type, size, name, imageUrl, modifiedAt;

  useEffect(() => {
    let tempImageSize = 0;
    let tempVideoSize = 0;
    let tempDocumentSize = 0;
    let tempOtherSize = 0;

    let tempImageCount = 0;
    let tempVideoCount = 0;
    let tempDocumentCount = 0;
    let tempOtherCount = 0;

    userInfo.forEach((doc) => {
      type = doc.data()["type"];
      size = doc.data()["size"];
      name = doc.data()["name"];
      imageUrl = doc.data()["imageUrl"];
      modifiedAt = doc.data()["modifiedAt"];

      switch (type) {
        case "jpg":
          tempImageCount++;
          tempImageSize = tempImageSize + size;
          break;
        case "png":
          tempImageCount++;
          tempImageSize = tempImageSize + size;
          break;
        case "docx":
          tempDocumentCount++;
          tempDocumentSize = tempDocumentSize + size;
          break;
        case "pdf":
          tempDocumentCount++;
          tempDocumentSize = tempDocumentSize + size;
          break;
        case "mp4":
          tempVideoCount++;
          tempVideoSize = tempVideoSize + size;
          break;

        default:
          tempOtherCount++;
          tempOtherSize = tempOtherSize + size;
          break;
      }
    });

    setUserMemory({
      image: (tempImageSize / 1024 ** 2).toFixed(2),
      video: (tempVideoSize / 1024 ** 2).toFixed(2),
      document: (tempDocumentSize / 1024 ** 2).toFixed(2),
      other: (tempOtherSize / 1024 ** 2).toFixed(2),
    });

    setImageCount(tempImageCount);
    setDocumentCount(tempDocumentCount);
    setVideoCount(tempVideoCount);
    setOtherCount(tempOtherCount);
  }, [userInfo]);

  let storageList = [
    {
      id: 1,
      type: "Images",
      totalFile: imageCount,
      size: `${userMemory.image} MB`,
      logo: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
    },
    {
      id: 2,
      type: "Videos",
      totalFile: videoCount,
      size: `${userMemory.video} MB`,
      logo: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z",
    },
    {
      id: 3,
      type: "Documents",
      totalFile: documentCount,
      size: `${userMemory.document} MB`,
      logo: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    },
    {
      id: 4,
      type: "Others",
      totalFile: otherCount,
      size: `${userMemory.other} MB`,
      logo: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
    },
  ];

  return (
    <div>
      {storageList ? (
        storageList.map((item, index) => (
          <StorageDetailItem key={"Storage_Item_" + index} item={item} index={index} />
        ))
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default StorageDetailList;
