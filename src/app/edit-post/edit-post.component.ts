import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { BlogPost } from '../BlogPost';
import { Router, ActivatedRoute} from '@angular/router';

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

  formSubmit(){
    this.tags.split(",").map(tag => tag.trim());
    this.data.updatePostById(this.blogPost._id,this.blogPost);
    this.route.navigate(['admin']);

  }

  deltePost(){
    this.data.deletePostById(this.blogPost._id);
    this.route.navigate(['admin']);
  }
}
