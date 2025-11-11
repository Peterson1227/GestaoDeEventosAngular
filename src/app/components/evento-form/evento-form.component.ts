import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent implements OnInit {
  form: any;
  id?: number;
  titulo = 'Novo Evento';

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // ✅ Agora o 'fb' já está inicializado
    this.form = this.fb.group({
      nome: ['', Validators.required],
      data: ['', Validators.required],
      local: ['', Validators.required],
      descricao: ['']
    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.titulo = 'Editar Evento';
      this.eventoService.buscarPorId(this.id).subscribe(e => this.form.patchValue(e));
    }
  }

  salvar() {
    const evento = this.form.value as Evento;
    if (this.id) {
      this.eventoService.atualizar(this.id, evento).subscribe(() => this.router.navigate(['/']));
    } else {
      this.eventoService.criar(evento).subscribe(() => this.router.navigate(['/']));
    }
  }

  cancelar() {
  this.router.navigate(['/']);
  }

}
