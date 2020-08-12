import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import {ActivatedRoute } from '@angular/router';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {
  post: BlogPost;
  querySub:any;
  commentName: string;
  commentText: string;

  private livePostSub;

  constructor(private route: ActivatedRoute,private data:PostService ) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params =>{
      //TODO: Get post by Id params['id'] and store the result in this.post
      this.getPostId(params.id);
     })
  }
  getPostId(id) {
    this.livePostSub = this.data.getPostbyId(id)
                          .subscribe(data =>{
                              this.post = data;
                              this.post.views += 1;
                              this.data.updatePostById(this.post._id,this.post).subscribe();
                            });
                          }

  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
  }

  submitComment(f:NgForm):void{

    this.post.comments.push(
      {
       author: this.commentName,
       comment: this.commentText,
       date: new Date().toLocaleDateString()
      });
      this.data.updatePostById(this.post._id,this.post).subscribe(()=>{
        this.commentName="";
        this.commentText="";
      });

      console.log(this.post.comments)
      }
  }

