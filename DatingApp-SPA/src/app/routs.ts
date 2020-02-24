import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
// import { MemberEditComponent } from './members/member-edit/member-edit.component';
// import { MemberEditResolver } from './_resolvers/member-edit.resolver';
// import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

// Ordering is important======================
export const appRouts: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: {user: MemberListResolver} },
            { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
            // { path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver},
            //     canDeactivate: [PreventUnsavedChangesGuard] },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListsComponent }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
//     { path: 'home', component: HomeComponent },
//     { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
//     { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
//     { path: 'lists', component: ListsComponent, canActivate: [AuthGuard] },
//     { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
