import { Routes } from '@angular/router';
import {adminSessionGuard} from './shared/guards/admin-session.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [adminSessionGuard], // Apply the guard to the root route
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'invitation/:familyId',
    loadComponent: () => import('./pages/frontend/invitation-page/invitation-page.component').then(m => m.InvitationPageComponent)
  },
  {
    path: 'bautizo/:familyId',
    loadComponent: () => import('./pages/frontend/invitation-bautizo-page/invitation-bautizo-page.component').then(m => m.InvitationBautizoPageComponent)
  },
  {
    path: 'bautizo-v2/:familyId',
    loadComponent: () => import('./pages/frontend/invitation-bautizo-v2-page/invitation-bautizo-v2-page.component').then(m => m.InvitationBautizoV2PageComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [adminSessionGuard],
    children: [
      {
        path: 'invitations',
        loadComponent: () => import('./pages/admin/invitations/invitations-list/invitations-list.component').then(m => m.InvitationsListComponent),
        canActivate: [adminSessionGuard]
      },
      {
        path: 'invitations/add',
        loadComponent: () => import('./pages/admin/invitations/invitations-add-edit/invitations-add-edit.component').then(m => m.InvitationsAddEditComponent),
        canActivate: [adminSessionGuard]
      },
      {
        path: 'invitations/edit/:id',
        loadComponent: () => import('./pages/admin/invitations/invitations-add-edit/invitations-add-edit.component').then(m => m.InvitationsAddEditComponent),
        canActivate: [adminSessionGuard]
      },
      {
        path: 'families',
        loadComponent: () => import('./pages/admin/families/families-list/families-list.component').then(m => m.FamiliesListComponent),
        canActivate: [adminSessionGuard]
      },
      {
        path: 'families/add',
        loadComponent: () => import('./pages/admin/families/families-add-edit/families-add-edit.component').then(m => m.FamiliesAddEditComponent),
        canActivate: [adminSessionGuard]
      },
      {
        path: 'families/edit/:id',
        loadComponent: () => import('./pages/admin/families/families-add-edit/families-add-edit.component').then(m => m.FamiliesAddEditComponent),
        canActivate: [adminSessionGuard]
      },
      {
        path: 'access',
        loadComponent: () => import('./pages/admin/family-access/family-access-list/family-access-list.component').then(m => m.FamilyAccessListComponent),
        canActivate: [adminSessionGuard]
      },
      {
        path: 'access/add',
        loadComponent: () => import('./pages/admin/family-access/family-access-add-edit/family-access-add-edit.component').then(m => m.FamilyAccessAddEditComponent),
        canActivate: [adminSessionGuard]
      },
      {
        path: 'access/edit/:id',
        loadComponent: () => import('./pages/admin/family-access/family-access-add-edit/family-access-add-edit.component').then(m => m.FamilyAccessAddEditComponent),
        canActivate: [adminSessionGuard]
      }
    ]
  }
];
