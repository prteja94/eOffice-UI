import { Component } from '@angular/core';
import { DirectionService } from '../../shared/services/direction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public directionService: DirectionService) { }
  
}
