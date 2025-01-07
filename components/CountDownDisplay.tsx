import { useCountDown } from "@/hooks/useCountDown";



//interface for props

interface CountDownDisplayProps {
    targetDate: Date;
}



const CountDownDisplay = ({targetDate}:CountDownDisplayProps) => {


    const timeLeft = useCountDown(targetDate);



  return (
    <div className="text-center text-4xl font-bold">
        {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} minutes {timeLeft.seconds} seconds
    </div>
  )
}

export default CountDownDisplay