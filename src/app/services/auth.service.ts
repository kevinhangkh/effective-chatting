import { Injectable, OnDestroy } from '@angular/core';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // user$: Observable<User>;
  isLogged: boolean = false;
  private authState: any = null;
  private user: Observable<firebase.User>;

  private readonly errors = {
    'auth/user-not-found': 'Incorrect email or password.',
    'auth/wrong-password': 'Incorrect email or password.'
  }
  
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private database: AngularFireDatabase,
    private router: Router
    ) { 
      // this.user = afAuth.user;
    }

    getUserId(): string {
      // console.log("getUserId " + this.authState);

      const uid = sessionStorage.getItem('user');

      return this.authState ? this.authState.user.uid : uid;
    }

    getUser() {
      return this.afAuth.user;
    }

    getCurrentUser(): Observable<any> {
      const uid = this.getUserId();

      // console.log("getCurrentUser " + uid);
      
      return this.database.list('users/' + uid).snapshotChanges()
      .pipe(
        map(userItem => {
          // console.log("wwwwwwww " + JSON.stringify(userItem));
          
          return userItem
          // .map(item => {
          //   console.log("eeeeeeeeee " + JSON.stringify(item));
            
          //   //   console.log("rrrrrr " + user.payload.val());

          //   return {
          //     key: item.key,
          //     value: item.payload.val()
          //   }
          // })
          // .filter(item => item.key === 'username')
        }));
    }

    getUserById(uid: string) {
      return this.afs.collection('users').doc(uid).get();
    }

    getConnectedUsers(): Observable<User[]> {
      var db = firebase.database();

      return this.database.list('users').snapshotChanges().pipe(
        map(users => {
          return users.map(user => {

            const connectedUser: User = {
              uid: user.key,
              // ...user.payload.val,
              email: user.payload.child('email').val(),
              username: user.payload.child('username').val(),
              status: user.payload.child('status').val(),
              // ...item.payload.child
            };
            return connectedUser;
          })
          .filter(user => user.status == 'online')
        })
      );
    }

    getAllConnectedUsers(): Observable<any> {
      return this.afs.collection<User>('users').snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            }
          }).filter(user => user.status === 'online')
        })
      );
    }

    signUp(email: string, username: string, password: string) {

      console.log('signing up...');

      return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
      
      return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        sessionStorage.setItem('user', user.user.uid);
        console.log(user);
        
        
        const status = 'online';
        this.setUserData(email, username, status);
        this.router.navigate(['/chat']);
      })

      })
    }

    setUserData(email: string, username: string, status: string) {

      const user: User = {
        // uid: this.getUserId(),
        email: email,
        username: username,
        status: status,
      }
      // this.afs.collection<User>('users').doc(this.getUserId()).set(
      //   user
      // ).then((res) => console.log(res)
      // ).catch(err => console.error(err)
      // );

      firebase.database().ref('users/' + this.getUserId()).set(user);
    }

    logIn(email: string, password: string): any {
      
      console.log('logging in...');

      return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {

      return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
        sessionStorage.setItem('user', user.user.uid);
        // console.log(user);

        const status = 'online';
        // this.setUserStatus(status);
        this.setUserStatusRealTime(status, this.getUserId());
        this.router.navigate(['/chat']);
      })

      })
    }

    setUserStatusRealTime(status: string, uid: string) {
      // console.log('setting status...' + status);

      var db = firebase.database();

      db.ref('users/' + uid).update({
        status: status
      });
    }

    setUserStatus(status: string) {

      console.log('setting status...' + status);

      const uid = this.getUserId();
      console.log("uid " + uid);
      
      if(!uid) {
        return;
      }
      // console.log("gonna update soon " + uid + " " + status);
      
      this.afs.collection<User>('users').doc(uid).update({
        status: status
      })
      .then((res) => console.log("FINISHED UPDATING STATUS")
      ).catch(err => console.error(err)
      );
    }
    
    logOut() {
      console.log('LOGGING OUT');
      
      // sessionStorage.removeItem('user');
      // this.setUserStatus('offline');
      this.setUserStatusRealTime('offline',this.getUserId());
      sessionStorage.removeItem('user');
      this.afAuth.signOut()
      .then(() => {
        this.authState = null;
        this.router.navigate(['login'])
      });
    }

    getErrorMessage(code: string): string {
      return this.errors[code];
    }
        
      }
