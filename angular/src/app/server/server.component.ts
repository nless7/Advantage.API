import { Component, OnInit, Input } from '@angular/core';
import { Server } from 'src/shared/Models/server';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  @Input() serverInput: Server;

  constructor() { }

  ngOnInit() {
  }

}
