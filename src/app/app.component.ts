import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Authentification',
      url: '/authentification'
    },

    {
      title: 'Inscription',
      url: '/inscription'
    },
    {
      title: 'Profile',
      url: '/profile',
    },

    {
      title: 'Notes',
      url: '/tab1',
    },
    {
      title: 'Mes contacts',
      url: '/liste-contacts',
    },
    {
      title: 'Recommandations',
      url: '/liste-contacts',
    },
   
 
  
    {
      title: 'Déconnexion',
      url: '/deconnexion',
    },
    
  ];
  
  constructor(
    private platform: Platform,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('liste-contacts/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
