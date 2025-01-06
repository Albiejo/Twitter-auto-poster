import Image from "next/image";
import RemainingTime from "@/components/RemainingTime";
import NextTweetCard from "@/components/NextTweetCard";
import DateList from "@/components/DateList";
import DateListWrapper from "@/components/DateListWrpper";
import Page from "./(tweet)/Dashboard/Page";


const dates = [
  '2024-12-01',
  '2024-12-02',
  '2024-12-03',
  '2024-12-04',
  '2024-12-05',
  '2024-12-06',
  '2024-12-07',
  '2024-12-08',
  '2024-12-09',
  '2024-12-10',
  '2024-12-11',
  '2024-12-12',
  '2024-12-13',
  '2024-12-14',
  '2024-12-15',
];


export default function Home() {
  return (
   <div className="mt-6">
    <h2 className="text-center m-10">Tweeter</h2>
    {/* <Page/> */}
    <div className="flex flex-wrap">
   <RemainingTime scheduledTime={"2024-12-31 23:59:59"}/>
   <NextTweetCard tweet={"hello"} scheduledTime={"2024-12-31 23:59:59"}/>
    </div>
  {/* <DateListWrapper dates={dates}/> */}
   </div>
  );
}
