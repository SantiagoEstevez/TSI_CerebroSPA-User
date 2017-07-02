import {Injectable, Inject, NgZone} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

export class SignalrWindow extends Window {
    $: any;
}

export enum ConnectionState {
    Connecting = 1,
    Connected = 2,
    Reconnecting = 3,
    Disconnected = 4
}

export class ChannelConfig {
    url: string;
    hubName: string;
    channel: string;
}

export class ChannelEvent {
    Name: string;
    ChannelName: string;
    Timestamp: Date;
    Data: any;
    Json: string;

    constructor() {
        this.Timestamp = new Date();
    }
}

class ChannelSubject {
    channel: string;
    subject: Subject<ChannelEvent>;
}


export class User {
   
    public Name: string;
    public Message: string;    
    public Group : string;  
    public IsMember?: boolean; 
    public DateCreated?
}

@Injectable()
export class ChannelService {

    
    starting$: Observable<any>;
    connectionState$: Observable<ConnectionState>;
    error$: Observable<string>;  
    joinGroupEvent$: Observable<User>;
    notifyEvent$: Observable<User>;
    notifyNewMembersEvent$: Observable<User>;
    messageReceivedEvent$: Observable<User>;
    oldMessagesEvent$: Observable<Array<User>>;
    leaveGroupEvent$: Observable<User>;
    membersStatusEvent$: Observable<User>;

    private joinGroupSubject: Subject<User> = new Subject<User>();
    private notifySubject: Subject<User> = new Subject<User>();
    private notifyNewSubject: Subject<User> = new Subject<User>();
    private messageReceivedSubject: Subject<User> = new Subject<User>();
    private oldMessagesSubject: Subject<Array<User>> = new Subject<Array<User>>();
    private leaveGroupSubject: Subject<User> = new Subject<User>();
    private membersStatusSubject: Subject<User> = new Subject<User>();

    private connectionStateSubject = new Subject<ConnectionState>();
    private startingSubject = new Subject<any>();
    private errorSubject = new Subject<any>();
    // These are used to track the internal SignalR state 
    private hubConnection: any;
    private hubProxy: any;


    constructor(private zone : NgZone,
        @Inject(SignalrWindow) private window: SignalrWindow
        
        
    ) {
          this.messageReceivedEvent$ = this.messageReceivedSubject.asObservable();
        if (this.window.$ === undefined || this.window.$.hubConnection === undefined) {
            throw new Error("The variable '$' or the .hubConnection() function are not defined...please check the SignalR scripts have been loaded properly");
        }

        // Set up our observables
        //

        this.connectionState$ = this.connectionStateSubject.asObservable();
        this.error$ = this.errorSubject.asObservable();
        this.starting$ = this.startingSubject.asObservable();
        this.joinGroupEvent$ = this.joinGroupSubject.asObservable();
        this.notifyEvent$ = this.notifySubject.asObservable();
        this.notifyNewMembersEvent$ = this.notifyNewSubject.asObservable();
        this.messageReceivedEvent$ = this.messageReceivedSubject.asObservable();
        this.oldMessagesEvent$ = this.oldMessagesSubject.asObservable();
        this.leaveGroupEvent$ = this.leaveGroupSubject.asObservable();
        this.membersStatusEvent$ = this.membersStatusSubject.asObservable();
        
        this.hubConnection = this.window.$.hubConnection();
        this.hubConnection.url = "http://localhost:6346/signalr";
        this.hubProxy = this.hubConnection.createHubProxy("ChatHub");
        
         // Define handlers for the connection state events
        //
        this.hubConnection.stateChanged((state: any) => {
            let newState = ConnectionState.Connecting;

            switch (state.newState) {
                case this.window.$.signalR.connectionState.connecting:
                    newState = ConnectionState.Connecting;
                    break;
                case this.window.$.signalR.connectionState.connected:
                    newState = ConnectionState.Connected;
                    break;
                case this.window.$.signalR.connectionState.reconnecting:
                    newState = ConnectionState.Reconnecting;
                    break;
                case this.window.$.signalR.connectionState.disconnected:
                    newState = ConnectionState.Disconnected;
                    break;
            }

            // Push the new state on our subject
            //
            this.connectionStateSubject.next(newState);
        });

        this.GroupEvents();
        this.NotifyMembers();
         this.RecievedMessage();
         this.startConnection();

        // Define handlers for any errors
        //
        this.hubConnection.error((error: any) => {
            // Push the error on our subject
            //
            this.errorSubject.next(error);
        });
            
          
    }

    /**
     * Start the SignalR connection. The starting$ stream will emit an 
     * event if the connection is established, otherwise it will emit an
     * error.
     */
     public startConnection(): void {
            this.hubConnection.start({ jsonp: true })
            .done(() => {
                this.startingSubject.next();
            })
            .fail((error: any) => {
                this.startingSubject.error(error);
            });
    }

     public stopConnection() : void {
        this.hubConnection.stop();
    }

    private GroupEvents(): void {
        this.hubProxy.on('onGroupAccepted', (data: User) => {
            this.zone.run(() => {
                this.joinGroupSubject.next(data);
            });
        });

        this.hubProxy.on('onGroupLeave', (data: User) => {
            this.zone.run(() => {
                this.leaveGroupSubject.next(data);
            });
        });
    }

    private NotifyMembers(): void {       
              
        this.hubProxy.on('notifyMembers', (data: User) => {
            this.zone.run(() => {
                this.notifySubject.next(data);
            });
        });

        this.hubProxy.on('notifyNewMembers', (data: User) => {
            this.zone.run(() => {
                this.notifyNewSubject.next(data);
            });
        });

        this.hubProxy.on('loadOldMessages', (data: Array<User>) => {
            this.zone.run(() => {
                this.oldMessagesSubject.next(data);
            });
        });

    }

    private RecievedMessage(): void {
        this.hubProxy.on('onRecieved', (data: User) => {
            this.messageReceivedSubject.next(data);
        });
    }

    public joinGroup(user: User) {
        this.hubProxy.invoke('JoinGroup', user);
    }

    public notifyNewMembers(user: User, oldMessages: Array<User>) {
        this.hubProxy.invoke('NotifyMembers', user);

        if (oldMessages.length > 0) {
            this.hubProxy.invoke('OldMessages', oldMessages);
        }
    }

    public sendMessage(message: User) {
        this.hubProxy.invoke('SendMessage', message);
    }

    public leaveGroup(user: User) {
        this.hubProxy.invoke('LeaveGroup', user);
    }

}