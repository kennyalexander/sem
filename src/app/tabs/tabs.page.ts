import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  username: string = '';

  constructor(private router: Router) {}
  ngOnInit() {
    this.username = history.state.username;
  }

  navigateTo(page: string) {
    this.router.navigate([page], { state: { username: this.username } });
  }  
}
