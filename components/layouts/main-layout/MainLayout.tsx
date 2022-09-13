import Footer from "../Footer/Footer";
import Header from "../header/Header";
import { motion, AnimatePresence } from "framer-motion";

type MainLayoutProps = {
  children: React.ReactNode;
  framerKey: string;
};

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 200, y: 0 },
};

function MainLayout({ children, framerKey }: MainLayoutProps) {
  return (
    <div className="main-layout h-screen w-screen">
      <Header></Header>
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={framerKey}
          variants={variants}
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          transition={{ type: "linear" }} // Set the transition to linear
          className=""
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout;
