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
import { AngularFireDatabase } from '@angular/fire/database';

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
    private database: AngularFireDatabase,
    private authService: AuthService,
    private router: Router) {

      this.auth.authState.subscribe(auth => {
        if (auth !== undefined && auth !== null) {
          this.user = auth;

          this.authService.getCurrentUser().subscribe(user => {

            const username = user[2].payload.val();
            console.log('test', user[2].payload.val());
            this.username = username;
            // console.log("test2 " + this.username);
            
          })
        }
      })
  }

    // getCurrentUser(): Observable<any> {
    //   const uid = this.user.uid;
    //   console.log("getCurrentUser " + uid);
      
    //   // return this.database.list('users').snapshotChanges()
    //   // .pipe(
    //   //   map(users => {
    //   //     return users.map(user => {
    //   //       return {
    //   //         id: user.key,
    //   //         // email: item.payload.child('email'),
    //   //         username: user.payload.child('username').val(),
    //   //         // status: item.payload.child('status'),
    //   //         // ...item.payload.child
    //   //       }
    //   //     }).filter(user => user.id === uid)
    //   //   }));

    //   return this.database.list('users/' + uid).snapshotChanges()
    //   .pipe(
    //     map(userItem => {
    //       // console.log("wwwwwwww " + JSON.stringify(users));
          
    //       return userItem.map(item => {
    //         // console.log("eeeeeeeeee " + JSON.stringify(user));
            
    //         //   console.log("rrrrrr " + user.payload.val());

    //         return {
    //           key: item.key,
    //           value: item.payload.val()
    //         }
    //         }
    //       )
    //       .filter(item => item.key === 'username')
    //     }));

    //   // return this.afs.collection('users').doc(user).get();
    // }

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

    sendMessage(message: string) {

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
