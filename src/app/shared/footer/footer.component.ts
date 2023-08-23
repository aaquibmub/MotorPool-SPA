import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  ngOnInit(): void {
    /* Back To Top */

    $(document).ready(() => {
      $('.page-wrapper').on('scroll', (el) => {
        if (el.currentTarget.scrollTop > 50) {
          $('.back-to-top').fadeIn();
        } else {
          $('.back-to-top').fadeOut();
        }
      });

      $('.back-to-top').on('click', () => {
        $('.page-wrapper').animate({ scrollTop: 0 }, 600);
        return false;
      });
    });

  }
}
