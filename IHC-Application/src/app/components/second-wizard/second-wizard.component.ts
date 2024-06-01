import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import OpenAI from "openai";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PoButtonModule, PoFieldModule, PoLoadingModule, PoPageModule, PoStepperModule} from "@po-ui/ng-components";

@Component({
  selector: 'app-second-wizard',
  standalone: true,
  imports: [
    FormsModule,
    PoButtonModule,
    PoFieldModule,
    PoStepperModule,
    ReactiveFormsModule,
    PoPageModule,
    PoLoadingModule
  ],
  templateUrl: './second-wizard.component.html',
  styleUrl: './second-wizard.component.css'
})
export class SecondWizardComponent implements OnInit {

  public questionsAndAnswers: any;
  public empathyMap: string | null = "";
  public loading: boolean = false;

  private openai: OpenAI;

  constructor(private http: HttpClient, private router: Router) {
    this.openai = new OpenAI({
      apiKey: '',
      dangerouslyAllowBrowser: true
    });
  }

  ngOnInit(): void {
    if (history.state.questionsAndAnswers) {
      this.questionsAndAnswers = history.state.questionsAndAnswers;
    }
  }

  async submitFinalAnswers() {
    this.loading = true;

    let prompt: string = this.generateFinalPrompt(JSON.stringify(this.questionsAndAnswers));
    let response = await this.openai.chat.completions.create({
      messages: [{role: "system", content: prompt}],
      model: "gpt-4",
    });

    this.empathyMap = response.choices[0].message.content;
    this.loading = false;
  }

  private generateFinalPrompt(message: string): string {
    return `
    Você vai me ajudar a montar um mapa de empatia contendo as seguintes chaves:
    - O que ele(a) vê?
    - O que ele(a) ouve?
    - O que ele(a) pensa e sente?
    - O que ele(a) fala e faz?
    - Quais são suas dores?
    - Quais são seus ganhos?

    Eu fiz algumas perguntas para o meu usuário relacionadas a essas chaves. Com base nas respostas fornecidas, quero que você gere o mapa de empatia.
    Para cada chave, elabore um texto interpretando as respostas para preencher o mapa de empatia.

    Aqui estão as perguntas e respostas que obtive do usuário:

    ${message}

    Com base nesse JSON com perguntas e respostas, por favor, retorne um mapa de empatia detalhado e coeso, faça algo realmente bem completo.
    Não só copie e cole o que eu mandei.
  `;
  }

}
