import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { GuidGeneratorService } from 'src/app/shared/guid-generator.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() productId: string;
  userId: string;
  commentList$!: Observable<any[]>;
  customerMap: Map<string,string> = new Map();
  comment: string;
  mark: number;
  constructor(private service:ApiService, private userService: UserService, private guiGen: GuidGeneratorService ) { }

  ngOnInit(): void {
    this.commentList$ = this.service.getCommentListForProduct(this.productId);
    this.updateMap();
  }

  sendComment(){
    var comment = {
      commentId: this.guiGen.newGuid(),
      productId: this.productId,
      userId: this.userService.getCustomerId(),
      commentText: this.comment,
      mark: this.mark,
    }
    this.service.addComent(comment).subscribe(x=>{
      this.commentList$ = this.service.getCommentListForProduct(this.productId);
      this.updateMap();
    });
    this.comment = '';
    this.mark = 0;
    document.getElementsByName("rating").forEach((x:any) => x.checked = false);
  }

  setMark(e:any){
    this.mark = e.target.value;
  }

  deleteComment(id:string){
    this.service.deleteComent(id).subscribe(x => this.commentList$ = this.service.getCommentListForProduct(this.productId));
  }

  updateMap(){
    this.commentList$.subscribe(coms=> {
      coms.forEach(com=>{
        let customer:any;
        this.service.getCustomer(com.userId).subscribe(user=>{
          customer = user;
          this.customerMap.set(com.userId, customer.fullName);
        });
      });
    });
    this.userId = this.userService.getCustomerId();
  }

}
