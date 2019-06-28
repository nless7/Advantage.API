import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Server } from 'src/shared/Models/server';
import { ServerMessage } from 'src/shared/Models/server-message';
import { Tree } from '@angular/router/src/utils/tree';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  @Input() serverInput: Server;
  @Output() serverAction = new EventEmitter<ServerMessage>();


  colour: string;
  buttonText: string;
  statusText: string;
  isLoading: boolean = false;
  serverStatus: string;


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
      this.serverStatus = 'Online';
    } else {
      this.serverInput.isOnline = false;
      this.colour = '#FF6B6B';
      this.buttonText = 'Start';
      this.serverStatus = 'Offline';
    }
  }

  sendServerAction(isOnline: boolean) {
    //Set the state of current server
    this.makeLoading();
    const payload = this.buildPayload(isOnline);
    this.serverAction.emit(payload);
  }

  makeLoading() {
    this.colour = '#FFCA28';
    this.buttonText = 'Pending...';
    this.isLoading = true;
    this.serverStatus = 'Loading...';
  }


  buildPayload(isOnline: boolean) : ServerMessage {
    if (isOnline) {
      return {
        id: this.serverInput.id,
        payload: 'deactivate'
      };
    } else {
      return {
        id: this.serverInput.id,
        payload: 'activate'
      };
    }
  }

}
