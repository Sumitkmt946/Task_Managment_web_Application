import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { TaskManagementComponent } from "./components/task-management/task-management.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppComponent,
    BrowserModule,
    CommonModule,
    FormsModule,
    TaskManagementComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}