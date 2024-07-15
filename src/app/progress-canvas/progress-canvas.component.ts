import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProgressService } from '../progress.service';

@Component({
  selector: 'app-progress-canvas',
  templateUrl: './progress-canvas.component.html',
  styleUrls: ['./progress-canvas.component.scss']
})
export class ProgressCanvasComponent implements OnInit {

  showPopup = false;
  progress = 0;

  constructor(private progressService: ProgressService) { }

  ngOnInit() {
    this.progressService.progress$.subscribe(val => {
      this.progress = val;
      if (val > 0) {
        this.showPopup = true;
      }
      if (val === 100) {
        this.showPopup = false;
      }
    });
  }

  togglePopup() {
    this.progressService.stopProgress();
    this.showPopup = !this.showPopup;
  }
}
