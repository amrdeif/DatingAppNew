import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    // ================================
    // This is no loner required as we get data from route itself....
    //
    // if we used this approach -LoadUser function- we have to add ? after using user object in the component html
    // to avoid getting errors in the console
    // that's because the component is loading faster than the request result
    //
    // ================================
    // this.loadUser();
    // ================================

    // after adding resolver, we will get data from the rout itself
    this.route.data.subscribe(data => {
      this.user = data.user;
    });

    // this.galleryOptions = [
    //   {
    //     width: '500px',
    //     height: '500px',
    //     imagePercent: 100,
    //     thumbnailsColumns: 4,
    //     imageAnimation: NgxGalleryAnimation.Slide,
    //     preview: false
    //   }
    // ];

    // this.galleryImages = this.getImages();

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/img/gallery/1-small.jpeg',
        medium: 'assets/img/gallery/1-medium.jpeg',
        big: 'assets/img/gallery/1-big.jpeg'
      },
      {
        small: 'assets/img/gallery/2-small.jpeg',
        medium: 'assets/img/gallery/2-medium.jpeg',
        big: 'assets/img/gallery/2-big.jpeg'
      },
      {
        small: 'assets/img/gallery/3-small.jpeg',
        medium: 'assets/img/gallery/3-medium.jpeg',
        big: 'assets/img/gallery/3-big.jpeg'
      },{
        small: 'assets/img/gallery/4-small.jpeg',
        medium: 'assets/img/gallery/4-medium.jpeg',
        big: 'assets/img/gallery/4-big.jpeg'
      },
      {
        small: 'assets/img/gallery/5-small.jpeg',
        medium: 'assets/img/gallery/5-medium.jpeg',
        big: 'assets/img/gallery/5-big.jpeg'
      }
    ];

  }

  getImages() {
    const imageUrls = [];

    // for (let i = 0; i < this.user.photos.length; i++) {
    //   imageUrls.push({
    //     small: this.user.photos[i].url,
    //     medium: this.user.photos[i].url,
    //     big: this.user.photos[i].url,
    //     description: this.user.photos[i].description
    //   });
    // }
    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }

  // ================================
  // This is no loner required as we get data from route itself
  // ================================
  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
  //     this.user = user;
  //   },
  //   error => {
  //     this.alertify.error(error);
  //   });
  // }


}
