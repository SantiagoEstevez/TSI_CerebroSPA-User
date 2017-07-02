import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";

import {ChannelService, ConnectionState, User} from "./services/channel.service";
import { NotificationsService } from 'angular2-notifications';
import {GrupoService, GrupoT} from './grupo.service';


@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    providers: [GrupoService]
})
export class ChatComponent implements OnInit {
private messageData : User;
private messages : User[] = [];
private members: Array<User> = new Array<User>();
private isLoggingOut: boolean = false;
private groups: Array<GrupoT> = [];
private grupoelegido: boolean = false;
    // An internal "copy" of the connection state stream used because
    //  we want to map the values of the original stream. If we didn't 
    //  need to do that then we could use the service's observable 
    //  right in the template.
    //   
    connectionState$: Observable<string>;

    constructor(
        private channelService: ChannelService,private _notification: NotificationsService, private grupoService: GrupoService
    ) {

        // Let's wire up to the signalr observables
        //
        this.connectionState$ = this.channelService.connectionState$
            .map((state: ConnectionState) => { return ConnectionState[state]; });

        this.channelService.error$.subscribe(
            (error: any) => { console.warn(error); },
            (error: any) => { console.error("errors$ error", error); }
        );

        // Wire up a handler for the starting$ observable to log the
        //  success/fail result
        
        //
          this.channelService.starting$.subscribe(
            (userId) => {
                console.log("signalr service has been started");
                console.log(userId);
            },
            () => { console.warn("signalr service failed to start!"); }
        );
    }



    ngOnInit() {
        // Start the connection up!
        //
        this.messageData = new User();
        this.messageData.Name = localStorage.getItem('userName');
        this.messageData.Group = '';

        console.log("Starting the channel service");
        this.getGroups()

        this.channelService.joinGroupEvent$.subscribe((data: User) => {
            console.log('welcome ' + JSON.stringify(data));
            this._notification.success('Join Group', 'Welcome to ' + this.messageData.Group + '!');
            this.messageData.IsMember = data.IsMember;

            this.members.push(data);
        }, err => this.errorHandler(err, 'Join Group'));



        this.channelService.notifyEvent$.subscribe((member: User) => {
            console.log('new member ' + JSON.stringify(member));
            this._notification.info('Join Group', member.Name + ' has joined the group.');

            this.members.push(member);

            //Notify New Members of your existence
            this.notifyNewMembers(this.messageData);

        }, err => this.errorHandler(err, 'Join Group'));



             this.channelService.notifyNewMembersEvent$.subscribe((member: User) => {

            //Check if member is already in the list
            let memberExist = this.members.find(x => {
                return x.Name == member.Name
            });

            //Prevent Duplicate Members in the list
            if (!memberExist) {
                this.members.push(member)
            }

            console.log('old member list ' + JSON.stringify(this.members));

        }, err => this.errorHandler(err, 'New Member notification'));


        this.channelService.messageReceivedEvent$.subscribe((data: User) => {
            console.log('new message ' + JSON.stringify(data));
            this.messages.push(data);

        }, err => this.errorHandler(err, 'Receiving Message'));


        this.channelService.oldMessagesEvent$.subscribe((messages: Array<User>) => {
            console.log('old message ' + JSON.stringify(messages));
            //Replace your current Messages with the Old messages including your messages in it
            this.messages = messages;

        }, err => this.errorHandler(err, 'Getting Old Messages'));


        this.channelService.leaveGroupEvent$.subscribe((user: User) => {

            this.members = this.members.filter((member: User) => member.Name != user.Name);

            if (this.messageData.Name == user.Name) {
                this.messageData.IsMember = false;
                this.messageData.Group = "";

                this.members = [];
                this.messages = [];
            }
            else {
                this._notification.warn(user.Name + ' has left the group!');
            }

        })






    }
        private errorHandler(error: any, title: string) {
        console.log(title + ':' + error);
        this._notification.error(title, 'An error occured while processing your request!');
    }

     private sortMembers(): Array<User> {

        return this.members.sort((a: User, b: User) => {
            var nameA = a.Name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.Name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
    }

        private sendMessage() {
        this.channelService.sendMessage(this.messageData);

        this.messageData.Message = "";
    }

    private notifyNewMembers(user: User) {
        this.channelService.notifyNewMembers(user, this.messages);
    }

    private getGroups(){
        this.grupoService.getGrupos().then(groups => this.groups = groups )
    }


        private joinGroup(groupName): void {
        if(groupName=="elija"){
            this.grupoelegido=false;
        }else{
            this.grupoelegido=true;
            this.messages=[]
            this.members=[]
            this.messageData.Group = groupName;
            this.channelService.joinGroup(this.messageData);
        }
        
    }

    private grupoele():boolean{
        return this.grupoelegido;
    }
}
