import {Component,Input, OnInit, OnDestroy} from "@angular/core";
import {Post} from '../post.model';
import{PostService} from '../posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts : Post[] = [];
  private PostSub!: Subscription;
  constructor(public postsService: PostService){}

  ngOnInit(){
    this.postsService.getPosts();
    this.PostSub=this.postsService.getPostUpdateListenetr().
      subscribe((posts: Post[])=>{
        this.posts = posts;
      });
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(){
    this.PostSub.unsubscribe();
  }
}
