import {Component, ElementRef} from '@angular/core';
import {City} from './app.service';

@Component({
  selector: 'app-root',
  host: {'(document:click)': 'handleClick($event)'},
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public filteredList: City[] = [];
  public elementRef;

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }

  handleClick(event) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filteredList = [];
    }
  }

  // responsive menu
  myFunction() {
    var x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }
}

