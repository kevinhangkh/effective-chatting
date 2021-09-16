import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginSignupGuard } from './guards/login-signup.guard';

const routes: Routes = [
  {path: 'login', component: LoginFormComponent, canActivate: [LoginSignupGuard]},
  {path: 'signup', component: SignupFormComponent, canActivate: [LoginSignupGuard]},
  {path: 'chat', component: ChatRoomComponent, canActivate: [AuthGuard]},
  // {path: 'chat', component: ChatRoomComponent},
  {path: '', redirectTo:'/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
