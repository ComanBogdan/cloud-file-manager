import menu from "../data/menu.js";
import Image from "next/image";
import React, { useState } from "react";
import CreateFolderModal from "./Folder/CreateFolderModal.js";
import UploadFileModal from "./File/UploadFileModal.js";
import { useRouter } from "next/router.js";

const SideNavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const closeModal = () => {
    window.my_modal_4.close()
  }

  return (
    <div className="w-[300px] bg-white h-screen sticky top-0 z-10 shadow-blue-300 shadow-md p-5">
      <div className="flex justify-center hover:scale-105 transition-all">
        <Image src="/Logo.png" alt="logo" width={150} height={60} />
      </div>

      <button className=" text-white justify-center text-[13px] flex gap-2 items-center bg-blue-500 p-2 rounded-md px-3 mt-5 w-full 
      hover:scale-105 transition-all"
      onClick={() => my_modal_4.showModal()}
        >
        Add New File
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>

      <button
        onClick={() => my_modal_3.showModal()}
        className=" text-white justify-center text-[13px] flex gap-2 items-center bg-sky-500 p-2 rounded-md px-3 mt-3 w-full hover:scale-105 transition-all"
      >
        New Folder
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
            d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
          />
        </svg>
      </button>

      <div>
        {menu.list.map((item, index) => {
          return (
            <div key={"menu_item_" + index}>
              <h2
                onClick={() => {
                  if(item.id == 1){
                    router.push('/');
                  }
                  setActiveIndex(index)
                }}
                className={`flex gap-2 items-center p-2 mt-5 rounded-md cursor-pointer
               hover:bg-blue-500 hover:scale-105 hover:text-white transition-all text-black
               ${activeIndex == index ? `bg-blue-500 text-white` : null}`}
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
                    d={item.logo}
                  />
                </svg>
                {item.name}
              </h2>
            </div>
          );
        })}
      </div>

      <dialog id="my_modal_3" className="modal">
        <CreateFolderModal />
      </dialog>

      
      <dialog id="my_modal_4" className="modal">
         <UploadFileModal closeModal={closeModal}/>
      </dialog>
    </div>
  );
};

export default SideNavBar;
