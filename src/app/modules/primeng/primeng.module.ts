import { NgModule } from '@angular/core';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {FileUploadModule} from 'primeng/fileupload';
import {SidebarModule} from 'primeng/sidebar';
import {ListboxModule} from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuModule } from 'primeng/menu';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';


const primeNg = [CalendarModule,DialogModule,TableModule,ImageModule,TooltipModule,InputNumberModule,FieldsetModule,AutoCompleteModule,MenuModule,AvatarModule,AvatarGroupModule,DropdownModule,InputTextModule,PasswordModule,ButtonModule,CardModule,RadioButtonModule,CheckboxModule,FileUploadModule,SidebarModule,ListboxModule,CommonModule]

@NgModule({
  declarations: [],
  imports: [primeNg],
  exports:[primeNg]
})
export class PrimengModule { }
