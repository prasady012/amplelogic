import { Component } from '@angular/core';
import { ProgressService } from './progress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amplelogic';

  constructor(private progressService: ProgressService) { }

  startProcess() {
    this.progressService.startProgress();
  }
}
