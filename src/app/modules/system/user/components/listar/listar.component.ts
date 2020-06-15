import { Component, OnInit } from '@angular/core';
import { UsuarioListAllDTO, UsuarioService } from 'src/app/modules/shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  usuarios: UsuarioListAllDTO[];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  carregarUsuarios() {
    this.subscriptions.push(
      this.usuarioService.getAll().subscribe(
        (data) => {
          this.usuarios = data;
        },
        (err) => console.log(err),
      ),
    );
  }
}
