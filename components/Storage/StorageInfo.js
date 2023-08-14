import { app } from '@/Config/FirebaseConfig'
import { ShowToastContext } from '@/context/ShowToastContext';
import { UserInfoContext } from '@/context/UserInfoContext';
import { UserMemoryContext } from '@/context/UserMemoryContext';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react'

const StorageInfo = () => {
   
    const db=getFirestore(app);
    const {userInfo, setUserInfo}=useContext(UserInfoContext);
    const { userMemory, setUserMemory} = useContext(UserMemoryContext);

    let totalSize=0;
    //in MB
    let maximumSize=10 ;


    const [totalSizePercent, setTotalSizePercent] = useState(0);
    const [totalSizeUsed, setTotalSizeUsed]=useState();

   
   const{data:session}=useSession();
    const getAllFiles= async () => {
        const q=query(collection(db, "Files"),
        where("createdBy", "==", session.user.email))

        const querySnapshot = await getDocs(q);

        let type,size,name, imageUrl, modifiedAt;


        querySnapshot.forEach((doc) => {
            totalSize=totalSize+doc.data()['size'];

            //add data to context
            type = doc.data()['type'];
            size = doc.data()['size'];
            name = doc.data()['name'];
            imageUrl = doc.data()['imageUrl']
            modifiedAt = doc.data()['modifiedAt']

            //setUserInfo([...userInfo, {type: type, size: size, name: name, imageUrl: imageUrl, modifiedAt: modifiedAt}])
        })

        setUserInfo(querySnapshot);

        setTotalSizeUsed((totalSize/1024 **2).toFixed(2))
        setTotalSizePercent((totalSize/1024 **2).toFixed(2)/maximumSize*100)
    }


    useEffect(() => {
      if(session){
        totalSize=0;
        getAllFiles();
      }
      }, [session])


      console.log("user info context")
      console.log(userInfo);

      console.log(totalSizePercent);
    

  return (
    <div className='mt-7'>
        <div>
            <h2>
                {totalSizeUsed} {" MB "}

                <span>
                    used of {" "}
                </span>
                {maximumSize} MB
            </h2>
        </div>
        <div className='w-full bg-gray-200  flex h-2.5'>
            <div className={`bg-green-200 h-2.5 w-[${Math.floor(userMemory.image/maximumSize*100)}%]`}></div>
            <div className={`bg-yellow-200 h-2.5 w-[${Math.floor(userMemory.document/maximumSize*100)}%]`}></div>
            <div className={`bg-red-200 h-2.5 w-[${Math.floor(userMemory.other/maximumSize*100)}%]`}></div>
            <div className={`bg-blue-200 h-2.5 w-[${Math.floor(userMemory.video/maximumSize*100)}%]`}></div>
        </div>
    </div>
  )
}

export default StorageInfo