import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import firestore from 'firebase/app';
import * as firebase from 'firebase';
import { ChatMessage } from '../models/chat-message.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: any;
  username: string;
  chatMessages: AngularFirestoreCollection<ChatMessage[]>;
  // users: 

  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    // private auth: AuthService,
    private router: Router) {

      this.auth.authState.subscribe(auth => {
        if (auth !== undefined && auth !== null) {
          this.user = auth;

          this.getCurrentUser().subscribe(user => {
            this.username = user.data().username;
            // console.log("username " + JSON.stringify(user.data()));
            
          })
        }
      })
  }

    getCurrentUser(): Observable<any> {
      const user = this.user.uid;
      return this.afs.collection('users').doc(user).get();
    }

    getUsers() {
      return this.afs.collection('users').get();
    }

    getMessages(): Observable<any>{
      return this.afs.collection<ChatMessage>('messages', ref => ref.orderBy('timestamp','asc').limitToLast(10))
      .snapshotChanges()
      .pipe(map(
        action => {return action.map(
        item => {
          var chatMessage: ChatMessage = {
            $key: item.payload.doc.id,
            ...item.payload.doc.data()
          }
          return chatMessage;
        }
      )}));
    }

    send(message: string) {

      console.log("username " + this.username);
      
      const chatMessage: ChatMessage = {
        email: this.user.email,
        username: this.username,
        message: message,
        timestamp: firebase.default.firestore.FieldValue.serverTimestamp()
      }

      this.afs.collection<ChatMessage>('messages').add(chatMessage)
      // .then(res => console.log(res))
      // .catch(err => console.error(err))
      ;
    }
}
