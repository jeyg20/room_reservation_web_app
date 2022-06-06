import{Post} from './post.model';

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import{map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostService{
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient ){

    }
	getPosts(){
    this.http.get<{message: string, posts: Post[] }>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{
        return postData.posts.map(post=>{
            return{
              title: post.title,
              breakfast: post.breakfast,
              startDate: post.startDate,
              endDate: post.endDate,
              amenities: post.amenities,
              id: post._id
            };
        });
    }))
    .subscribe((transformedPost)=>{
        this.posts = transformedPost;
        this.postUpdated.next([...this.posts]);
    });
  }

  addPost(title: string, startDate: string, endDate: string, breakfast: string, amenities: boolean){
    const post: Post={
        id: null,
        title: title,
        breakfast: breakfast,
        startDate: startDate,
        endDate: endDate,
        amenities: amenities};
    this.http.post<{message: string}>('http://localhost:3000/api/posts',post)
        .subscribe((responseData)=>{
            console.log(responseData.message);
            this.posts.push(post);
            this.postUpdated.next([...this.posts]);
        });
    }
	deletePost(postId:string){
			this.http.delete("http://localhost:3000/api/posts/"+postId)
			.subscribe(()=>{
					const updatedPosts = this.posts.filter(post=>post.id!==postId);
					this.posts=updatedPosts;
					this.postUpdated.next([...this.posts]);
			});
	}
    updatePost(id: string, title: string, startDate: string, endDate: string, breakfast: string, amenities: boolean){
        const post: Post = {
            id: id,
            title: title,
            breakfast: breakfast,
            startDate: startDate,
            endDate: endDate,
            amenities: amenities};
        this.http.put("http://localhost:3000/api/posts/"+id, post)
        .subscribe(response =>{
            const updatedPosts = [...this.posts];
            const oldPostIndex = updatedPosts.findIndex(p => p.id=== post.id);
            updatedPosts[oldPostIndex] = post;
            this.posts = updatedPosts;  
            this.postUpdated.next([...this.posts]);

        })
    }

	getPostUpdateListenetr(){
		return this.postUpdated.asObservable();
	}

	getPost(id: string){
		return this.http.get<{_id: string, title: string,  startDate: string, endDate: string, breakfast: string, amenities: boolean}>("http://localhost:3000/api/posts/"+id);  
	}
}
