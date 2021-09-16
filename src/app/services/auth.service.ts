import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
    ) { 
      // this.user = afAuth.user;
    }

    getUserId(): string {
      console.log(this.authState);

      // if (!this.authState) {
        const uid = sessionStorage.getItem('user');

      // }
      // console.log(this.authState.user.uid);
      return this.authState ? this.authState.user.uid : uid;
    }

    getUser() {
      // const uid = this.getUserId();
      // console.log(uid);
      
      // return uid ? this.afs.collection('users').doc(uid).get() : null;
      return this.afAuth.user;
      // return this.user;
    }

    getUserById(uid: string) {
      return this.afs.collection('users').doc(uid).get();
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
      
      return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        sessionStorage.setItem('user', user.user.uid);
        console.log(user);
        
        
        const status = 'online';
        this.setUserData(email, username, status);
      })
      .catch(err => console.error(err)
      );
    }

    setUserData(email: string, username: string, status: string) {

      const user: User = {
        // uid: this.getUserId(),
        email: email,
        username: username,
        status: status,
      }
      this.afs.collection<User>('users').doc(this.getUserId()).set(
        user
      ).then((res) => console.log(res)
      ).catch(err => console.error(err)
      );
    }

    logIn(email: string, password: string) {
      
      console.log('logging in...');

      return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
        sessionStorage.setItem('user', user.user.uid);
        // console.log(user);

        const status = 'online';
        this.setUserStatus(status);
      });
    }

    setUserStatus(status: string) {

      console.log('setting status...' + status);

      const uid = this.getUserId();
      if(!uid)
        return;
      
      this.afs.collection<User>('users').doc(uid).update({
        status: status
      })
      .then((res) => console.log(res)
      ).catch(err => console.error(err)
      );
    }
    
    logOut() {
      this.setUserStatus('offline');
      sessionStorage.removeItem('user');
      this.afAuth.signOut();
      this.router.navigate(['login']);
    }
    // getUser() {
    //   return this.user$.pipe(first()).toPromise();
    // }
    
    // async signIn(email: string, password: string, displayName: string): Promise<any> {
    //   await this.afAuth.signInWithEmailAndPassword(email, password)
    //   .then(
    //     res => {
    //       if (res) {
    //         this.isLogged = true;
    //         localStorage.setItem('user',JSON.stringify(res.user));
    //       }
    //     }
    //     ).catch(err => console.log(err));
    //   }
      
    //   async signUp(email: string, password: string, displayName: string): Promise<any> {
    //     await this.afAuth.createUserWithEmailAndPassword(email, password)
    //     .then(
    //       res => {
    //         if (res) { 
    //           var uid = res.user.uid;
    //           this.isLogged = true;
    //           localStorage.setItem('user',JSON.stringify(res.user));
    //           this.afs.collection<User>('users').doc<User>(res.user.uid).set({
    //             uid,
    //             email,
    //             displayName
    //           }).catch(err => console.error(err)
    //           )
    //         }
    //       }
    //       ).catch(err => console.log(err));
    //     }
        
    //     async logOut() {
    //       await this.afAuth.signOut();
    //       localStorage.removeItem('user');
    //       return this.router.navigate(['/']);
    //     }
        
        
      }
