import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Twitter } from 'lucide-react'

interface NextTweetCardProps {
  tweet: string
  scheduledTime: string
}

const NextTweetCard: React.FC<NextTweetCardProps> = ({ tweet, scheduledTime }) => {
  const characterCount = tweet.length
  const maxCharacters = 280 // Twitter's maximum character count

  return (
    <Card className="w-full max-w-md mx-auto my-4">
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Upcoming Tweet</CardTitle>
        <img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/twitter.svg" />
      </CardHeader>


      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Scheduled for: {scheduledTime.toLocaleString()}
          </p>
          <p className="text-sm font-medium leading-none mt-2">{tweet}</p>
          <div className="flex justify-between items-center mt-4">
            <Badge variant={characterCount > maxCharacters ? "destructive" : "secondary"}>
              {characterCount}/{maxCharacters} characters
            </Badge>
            <p className="text-xs text-muted-foreground">
              {characterCount > maxCharacters ? "Tweet is too long!" : "Ready to post"}
            </p>
          </div>
        </div>
      </CardContent>


    </Card>
  )
}

export default NextTweetCard

