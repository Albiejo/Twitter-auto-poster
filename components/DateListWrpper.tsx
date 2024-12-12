"use client";

import DateList from "./DateList";

const DateListWrapper = ({ dates }: { dates: string[] }) => {
  const handleDateClick = (date: string) => {
    console.log(`Date clicked: ${date}`);
  };

  return (
    <div  className="items-center">
      <DateList dates={dates} onDateClick={handleDateClick} />
    </div>
  );
};

export default DateListWrapper;
