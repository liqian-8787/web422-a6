import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { BlogPost } from '../BlogPost';
import { Router, ActivatedRoute} from '@angular/router';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  blogPost:BlogPost={};
  tags:string;
  private livePost;
  constructor(private data:PostService,private router: ActivatedRoute,private route: Router) { }

  ngOnInit(): void {
    let id = this.router.snapshot.params['id'];
    this.livePost= this.data.getPostbyId(id)
    .subscribe((data)=>{
         this.blogPost = data;
         this.tags=this.blogPost.tags.toString();})

 }

  formSubmit(f:NgForm):void{
    this.tags.split(",").map(tag => tag.trim());
    this.data.updatePostById(this.blogPost._id,this.blogPost).subscribe();;
    this.route.navigate(['admin']);

  }

  deletePost(){
    this.data.deletePostById(this.blogPost._id).subscribe();
    this.route.navigate(['admin']);
  }
}
