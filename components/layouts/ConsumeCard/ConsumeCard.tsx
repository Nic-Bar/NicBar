import { Consumable } from "@prisma/client"
import Image from "next/image"

type ConsumeCardProps = {
  consumable: Consumable | null 
}

function ConsumeCard({consumable}: ConsumeCardProps) {
  return (
    <div className="min-w-36 max-w-36 bg-contain bg-[url(https://images.lecker.de/,id=56ad8212,b=lecker,w=610,cg=c.jpg)]">
    </div>
  )
}

export default ConsumeCard