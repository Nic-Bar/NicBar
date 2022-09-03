import {  motion, useTime, useTransform, useMotionValue} from "framer-motion"
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


function Menu() {
  const router = useRouter();
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  function toggleMenu(event:any, info:any){
    
    router.push({
      hash: !isMenuOpened ? "menu" : "", 
    }, undefined, {shallow: true})
    setIsMenuOpened(!isMenuOpened);
  }

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if(hash === "menu"){
      setIsMenuOpened(true);
    }
    
  }, [])

  return (
    <div className=" fixed bottom-0 z-20 " >
      <div className="flex justify-center w-screen">
        <motion.div 
          className="bg-darkBlue rounded-full m-6" 
          animate={{
            height: isMenuOpened ? 200 : 50,
            width: isMenuOpened ? 200 : 150,
          }}
          onTap={toggleMenu}
        >
          
        </motion.div>
        
        </div>
      </div>
  )
}

export default Menu