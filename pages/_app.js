import SideNavBar from "@/components/SideNavBar";
import Toast from "@/components/Toast";
import { ShowToastContext } from "../context/ShowToastContext";
import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
import { UserInfoContext } from "@/context/UserInfoContext";
import Storage from "@/components/Storage/Storage";
import { UserMemoryContext } from "@/context/UserMemoryContext";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [showToastMsg, setShowToastMsg] = useState("");
  const [parentFolderId, setParentFolderId] = useState();
  const [userInfo, setUserInfo] = useState([]);
  const [userMemory, setUserMemory] = useState({
      images: 0,
      videos: 0,
      documents: 0,
      others: 0,
  }
  );

  return (
    <SessionProvider session={session}>
      <UserMemoryContext.Provider value={{userMemory, setUserMemory}}>
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
          <ParentFolderIdContext.Provider
            value={{ parentFolderId, setParentFolderId }}
          >
            <ShowToastContext.Provider
              value={{ showToastMsg, setShowToastMsg }}
            >
              <div className="flex">
                <SideNavBar />
                <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                  <div className="col-span-2 bg-[#EEF5FE]">
                    <Component {...pageProps} />
                  </div>
                  <div className="bg-white p-5 order-first md:order-last">
                    <Storage />
                  </div>
                </div>
              </div>
              {showToastMsg ? <Toast msg={showToastMsg} /> : null}
            </ShowToastContext.Provider>
          </ParentFolderIdContext.Provider>
        </UserInfoContext.Provider>
      </UserMemoryContext.Provider>
    </SessionProvider>
  );
}
