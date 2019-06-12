import { Component, OnInit, Input } from '@angular/core';
import { Server } from 'src/shared/Models/server';
import { Tree } from '@angular/router/src/utils/tree';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  @Input() serverInput: Server;
  colour: string;
  buttonText: string;
  statusText: string;

  constructor() { }

  ngOnInit() {
    this.setServerStatus(this.serverInput.isOnline);
  }

  /// <summary>
  /// Update the display of the server based on the online status.
  /// </summary>
  /// <param name="isOnline">The online status.</param>
  setServerStatus(isOnline: boolean) {
    if (isOnline) {
      this.serverInput.isOnline = true;
      this.colour = '#66BB6A';
      this.buttonText = 'Shutdown';
      this.statusText = 'Online';
    } else {
      this.serverInput.isOnline = false;
      this.colour = '#FF6B6B';
      this.buttonText = 'Start';
      this.statusText = 'Offline';
    }
  }

  /// <summary>
  /// Update toggle status to the opposite status when it is clicked.
  /// This also updates the colours.
  /// </summary>
  /// <param name="isOnline">The online status.</param>
  toggleStatus(isOnline: boolean) {
    this.setServerStatus(!isOnline);
  }

}
