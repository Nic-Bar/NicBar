import { AnimatePresence, motion, useTime, useTransform, useMotionValue} from "framer-motion"

function abc() {
  const time = useTime();
  const x = useMotionValue(2)
    const rotate = useTransform(
      time,
      [0, 4000], // For every 4 seconds...
      [0, 360], // ...rotate 360deg
      { clamp: false }
    )
    
  return (
    <div className="min-h-full min-w-full place-content-center">
      <AnimatePresence>
      
      <motion.div className="h-36 w-36 bg-darkBlue rounded-md m-6" style={{x, rotate}}
        initial={
          {
            
          }
        }
        animate={
          {
            duration: 2,
            opacity: 1,
            background: "#000000"
          }
        }
        exit={{ opacity: 0 }}
      />

      </AnimatePresence>
    </div>
  )
  
}

export default abc

