import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class Header implements OnInit, OnDestroy {

  @Output() selectedFeature = new EventEmitter()
  sub: Subscription
  authenticated=false
  constructor(private dateStore: DataStorageService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.sub = this.authService.user.subscribe((user) => {
      this.authenticated = !!user
    })
  }
  ngOnDestroy(){
    this.sub.unsubscribe()
  }

  onSelect(feature: string) {
    this.selectedFeature.emit(feature);
  }

  saveData() {
    this.dateStore.storeRecipes()
  }
  onLogout(){
    this.authService.logout()
  }

  fetchData() {
    this.dateStore.fetchRecipes().subscribe()
  }
}
