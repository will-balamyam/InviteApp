import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseModel} from '../models/response-model';
import {FamilyAccessModel, FamilyModel, InvitationModel} from '../models/invitation-model';

@Injectable({
  providedIn: 'root'
})
export class ApiInvitationsService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // Get all invitations
  getInvitations(): Observable<ResponseModel<InvitationModel[]>> {
    return this.http.get<ResponseModel<InvitationModel[]>>(`${this.baseUrl}/invitations`);
  }
  // Get invitation by ID
  getInvitationById(id: number): Observable<ResponseModel<InvitationModel>> {
    return this.http.get<ResponseModel<InvitationModel>>(`${this.baseUrl}/invitations/${id}`);
  }
  // Create a new invitation
  createInvitation(invitation: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/invitations`, invitation);
  }
  // Update an existing invitation
  updateInvitation(id: number, invitation: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/invitations/${id}`, invitation);
  }
  // Delete an invitation
  deleteInvitation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/invitations/${id}`);
  }

  //Login
  login(user: any, password: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/login`, { user, password });
  }

  // Get all families
  getFamilies(): Observable<ResponseModel<FamilyModel[]>> {
    return this.http.get<ResponseModel<FamilyModel[]>>(`${this.baseUrl}/families`);
  }
  // Get family by ID
  getFamilyById(id: number): Observable<ResponseModel<FamilyModel>> {
    return this.http.get<ResponseModel<FamilyModel>>(`${this.baseUrl}/families/${id}`);
  }
  // Get family by code
  getFamilyByCode(familyCode: string): Observable<ResponseModel<FamilyModel>> {
    return this.http.get<ResponseModel<FamilyModel>>(`${this.baseUrl}/families/byCode/${familyCode}`);
  }
  // Create a new family
  createFamily(family: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/families`, family);
  }
  // Update an existing family
  updateFamily(id: number, family: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/families/${id}`, family);
  }
  // Delete an family
  deleteFamily(id: number|undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/families/${id}`);
  }

  // Get all family access
  getFamilyAccess(): Observable<ResponseModel<FamilyAccessModel[]>> {
    return this.http.get<ResponseModel<FamilyAccessModel[]>>(`${this.baseUrl}/family-access`);
  }
  // Get family access by ID
  getFamilyAccessById(id: number): Observable<ResponseModel<FamilyAccessModel>> {
    return this.http.get<ResponseModel<FamilyAccessModel>>(`${this.baseUrl}/family-access/${id}`);
  }
  // Create a new family access
  createFamilyAccess(familyAccess: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/family-access`, familyAccess);
  }
  // Update an existing invitation
  updateFamilyAccess(id: number, familyAccess: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/family-access/${id}`, familyAccess);
  }
  // Delete an invitation
  deleteFamilyAccess(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/family-access/${id}`);
  }

  // Send invitation via WhatsApp
  sendInvitationWhats(familyId: number | undefined): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/families/${familyId}/send-invitation-whats`, {});
  }

  // Send confirmation via WhatsApp
  sendConfirmationWhats(familyId: string | undefined): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/families/${familyId}/send-confirmation-whats`, {});
  }
}
