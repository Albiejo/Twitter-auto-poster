import React from 'react'
import { Button } from "@/components/ui/button"



interface DateCircleProps {
    date:Date,
    onClick:()=>void
}

const DateCircle = ({date , onClick}:DateCircleProps) => {
  return (
    <Button className='w-16 h-16 rounded-full flex items-center justify-center text-sm font-semibold' onClick={onClick}> 
        {date.getDate()}
    </Button>
  )
}

export default DateCircle