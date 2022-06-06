import { Component, OnInit } from '@angular/core';
import {Post} from '../post.model';
import {NgForm, FormGroup,} from "@angular/forms";
import{PostService} from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit{

  private mode= 'create';
  private postId: string;
  post: Post;

  constructor(public postsService: PostService, public route:ActivatedRoute){
    
  }
    
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode='edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe(postData=>{  
            this.post = {
                id: postData._id,
                title: postData.title ,
                startDate: postData.startDate,
                endDate: postData.endDate,
                breakfast: postData.breakfast,
                amenities: postData.amenities}  
      });  
      }else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    if(this.mode==="create"){
      this.postsService.addPost(
        form.value.title,
        form.value.startDate,
        form.value.endDate,
        form.value.breakfast,
        form.value.amenities);
    }else{
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.startDate,
        form.value.endDate, 
        form.value.breakfast, 
        form.value.amenities
      );
    }
    form.resetForm();
  }
}
