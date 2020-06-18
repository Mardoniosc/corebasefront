import { Component, OnInit } from '@angular/core';
import { Permissoes, PermissaoService } from 'src/app/modules/shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  permissoes: Permissoes[];

  private subscriptions: Subscription[] = [];

  constructor(private permissaoService: PermissaoService) {}

  ngOnInit(): void {
    this.carregaPermissoes();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  carregaPermissoes() {
    this.subscriptions.push(
      this.permissaoService.getAll().subscribe(
        (data) => {
          this.permissoes = data;
        },
        (err) => {
          console.log(err);
        },
      ),
    );
  }
}
