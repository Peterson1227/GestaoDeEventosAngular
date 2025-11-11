import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-evento-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.css']
})
export class EventoListComponent implements OnInit {
  eventos: Evento[] = [];

  constructor(private eventoService: EventoService, private router: Router) {}

  ngOnInit() {
    this.carregarEventos();
  }

  carregarEventos() {
    this.eventoService.listar().subscribe(data => (this.eventos = data));
  }

  editar(id: number) {
    this.router.navigate(['/editar', id]);
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      this.eventoService.excluir(id).subscribe(() => this.carregarEventos());
    }
  }
}
