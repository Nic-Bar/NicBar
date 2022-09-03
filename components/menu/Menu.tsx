import {  motion, useTime, useTransform, useMotionValue} from "framer-motion"
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


let width = 0, height = 0;

if (typeof window !== "undefined") {
  width = window.innerWidth;
  height = window.innerHeight;
}

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

  console.log(width);
  

  return (
    <div className=" fixed -bottom-2" >
      <div className="flex justify-center w-screen ">
        <div>
          <div className="flex justify-center">
          <motion.div 
            className="bg-darkBlue rounded-full h-36 w-36 z-20 translate-y-20" 
            animate={{
            }}
            onTap={toggleMenu}
          >          
          </motion.div>
          </div>
          <motion.div 
            className="bg-darkBlue z-10 top-1" 
            animate={{
              height: isMenuOpened ? height-50 : 50,
              width: width,
              borderRadius: 10
            }}
          >
            
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Menu