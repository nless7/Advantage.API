import { Component, OnInit } from '@angular/core';
import { Server } from 'src/shared/Models/server';

const SAMPLE_SERVERS = [
  {id: '', name: 'dev-web', isOnline: true},
  {id: '', name: 'dev-mail', isOnline: false},
  {id: '', name: 'prod-web', isOnline: true},
  {id: '', name: 'prod-mail', isOnline: true }
];

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css']
})
export class SectionHealthComponent implements OnInit {

  servers: Server[] = SAMPLE_SERVERS;

  constructor() { }

  ngOnInit() {
  }

}
