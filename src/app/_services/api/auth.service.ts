import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDTO} from "../../_models";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = "http://localhost:5052/api/v1/Auth"
  constructor(private http: HttpClient) { }

  login(userDTO : UserDTO) {
    this.http.post(`${this.api}/login`, userDTO, {observe : "response"})
      .subscribe(response => {
        switch (response.status) {
          case 200: //save the token to local storage
                    // @ts-ignore
            localStorage.setItem("token", response.body.token)
            return;
          case 401:
            console.log("Invalid Username or Password.")
        }
      })
    }

  register(userDTO : UserDTO) {
    this.http.post(`${this.api}/register`, userDTO, {observe: "response"})
      .subscribe((response) =>{
        switch (response.status) {
          case 200:
            console.log("Registered successfully.")
            break;
          case 401:
            console.log("Registration failed.")
        }
    })
  }
}
