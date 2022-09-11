import {  motion } from "framer-motion"
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
    <motion.div
      className="bg-darkBlue z-40 h-screen w-screen rounded-md fixed left-0"
      animate={{
        top: !isMenuOpened ? "90vh" : "7rem",
      }}
      initial={{
        top: "90vh",
      }}
    >
      <div className="flex justify-center w-screen ">
        <div>
          <div
            className="bg-darkBlue z-40 h-screen w-screen rounded-md absolute left-0"
          >
            <div className="flex justify-center">
              <motion.div
                className="rounded-full h-36 w-36 z-30 absolute -top-[4.5rem]"
                animate={{ background: isMenuOpened ? "#f2695c" : "#3e4759" }}
                onTap={toggleMenu}
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Menu