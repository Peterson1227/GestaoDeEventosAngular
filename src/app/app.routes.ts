import { Routes } from '@angular/router';
import { EventoListComponent } from './components/evento-list/evento-list.component';
import { EventoFormComponent } from './components/evento-form/evento-form.component';

export const routes: Routes = [
  { path: '', component: EventoListComponent },
  { path: 'novo', component: EventoFormComponent },
  { path: 'editar/:id', component: EventoFormComponent },
  { path: '**', redirectTo: '' }
];
