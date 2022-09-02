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
    <div className="min-h-full min-w-full flex justify-center relative" >
        <motion.div 
          className="h-36 w-36 bg-darkBlue rounded-full m-6" 
          onTap={toggleMenu}
        >
          {
            isMenuOpened && "menu opened"
          }
        </motion.div>
      
      </div>
  )
}

export default Menu