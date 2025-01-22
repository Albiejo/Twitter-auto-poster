import React from 'react'
import { Button } from "@/components/ui/button"
import moment from 'moment';


interface DateCircleProps {
    date:Date,
    onClick:()=>void
}

const DateCircle = ({date , onClick}:DateCircleProps) => {

  const dateObject = new Date(date); 
  const formattedDate = moment(date).format('D');

  return (
    <Button className="bg-black hover:bg-gray-800 text-white"  style={{
      borderRadius: '9999px',
      width: '64px',
      height: '64px',
    }} onClick={onClick}> 
       {formattedDate}
    </Button>
  )
}

export default DateCircle