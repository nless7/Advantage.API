import { Component, OnInit, OnDestroy } from '@angular/core';
import { Server } from 'src/shared/Models/server';
import { ServerService } from 'src/shared/Service/server-service';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { ServerMessage } from 'src/shared/Models/server-message';

//const SAMPLE_SERVERS = [
//  {id: '', name: 'dev-web', isOnline: true},
//  {id: '', name: 'dev-mail', isOnline: false},
//  {id: '', name: 'prod-web', isOnline: true},
//  {id: '', name: 'prod-mail', isOnline: true }
//];

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css']
})
export class SectionHealthComponent implements OnInit, OnDestroy {

  servers: Server[];
  timerSubscription: AnonymousSubscription;

  constructor(private _serverService: ServerService) { }

  ngOnInit() {
    this.refreshData();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // This is done to avoid memory leaks.
    }
  }

  refreshData() {
    this._serverService.getServers().subscribe(result => {
      this.servers = result;
    });

    this.subscribeToData();
  }

  subscribeToData() {
    this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.refreshData());
  }

  sendMessage(msg: ServerMessage) {
    this._serverService.handleServerMessage(msg)
      .subscribe(res => console.log('Message sent to server:', msg),
        err => console.log('Error:', err));
  }


}
