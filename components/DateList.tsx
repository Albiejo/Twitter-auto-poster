'use client';

import React from 'react'

const DateList = ({dates , onDateClick} : {dates:string[] , onDateClick:(date:string)=>void }) => {
  return (
    <div className='grid grid-cols-4  gap-3  py-4 '>
        {
            dates.map((date)=>{
                return(
                <button
                key={date}
                onClick={()=>onDateClick(date)}
                className='bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:bg-blue-600'
                >
                    {new Date(date).getDate()}
                </button>
             )})
        }
    </div>
  )
}

export default DateList