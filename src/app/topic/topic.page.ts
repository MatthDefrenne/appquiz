import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})
export class TopicPage implements OnInit {

  
  topics = [
    {
      value: 0,
      text: "Any category",
      color: "#212121"
    },
    {
      value: 21,
      text: "Sports",
      color: "#f8cf06"
    },
    {
      value: 15,
      text: "Video Games",
      color: "#3F51B5"
    },
    {
      value: 22,
      text: "Geography",
      color: "#9bf806"
    },
    {
      value: 23,
      text: "History",
      color: "#06d6f8"
    },
    {
      value: 24,
      text: "Politics",
      color: "#06aaf8"
    },
    {
      value: 25,
      text: "Art",
      color: "#0667f8"
    },
    {
      value: 26,
      text: "Celebrities",
      color: "#4206f8"
    },
    {
      value: 27,
      text: "Animals",
      color: "#b106f8"
    },
    {
      value: 17,
      text: "Science & Nature",
      color: "#761dae"
    },
   
  ]
  constructor(public socketService: SocketService) {}

  ngOnInit() {
  }

  joinAGame(topicId) {
    this.socketService.wantToJoin(topicId);
  }

}
