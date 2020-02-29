import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  // To Access component HTML form and reset it. So it is not dirty and disable save changes button
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  photoUrl: string;

  // Control closing browser tab without saving changes.
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.authService.currentPhotoUrl.subscribe(x => this.photoUrl = x);
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid , this.user).subscribe(next => {
      this.alertify.success('Profile Update Successfully');
      // Reset form
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
