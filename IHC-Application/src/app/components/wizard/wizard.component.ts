import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PoFieldModule, PoModule, PoStepperModule} from '@po-ui/ng-components';
import {FormsModule} from "@angular/forms";
import OpenAI from "openai";

@Component({
  selector: 'app-wizard',
  standalone: true,
  templateUrl: './wizard.component.html',
  imports: [
    PoStepperModule,
    PoFieldModule,
    FormsModule,
    PoModule
  ],
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent {
  firstQuestionsAndAnswers: any = {
    "session1": {
      "theme": "O que ele(a) vê?",
      "see1": {
        "question": "Quais são os principais desafios ou problemas que ele(a) observa ao seu redor?",
        "answer": ""
      },
      "see2": {
        "question": "Em que tipo de ambiente ele(a) está frequentemente inserido (ex. trabalho, casa, comunidade)?",
        "answer": ""
      }
    },
    "session2": {
      "theme": "O que ele(a) ouve?",
      "hear1": {
        "question": "Quais são as principais fontes de informação e influência na vida dele(a) (ex. mídia, amigos, família)?",
        "answer": ""
      },
      "hear2": {
        "question": "Que tipo de feedback ou conselhos ele(a) costuma receber?",
        "answer": ""
      }
    },
    "session3": {
      "theme": "O que ele(a) pensa e sente?",
      "thinkFeel1": {
        "question": "Quais são as maiores preocupações ou medos dele(a) atualmente?",
        "answer": ""
      },
      "thinkFeel2": {
        "question": "Quais são as aspirações ou objetivos de longo prazo dele(a)?",
        "answer": ""
      }
    },
    "session4": {
      "theme": "O que ele(a) fala e faz?",
      "sayDo1": {
        "question": "Que tópicos ele(a) discute frequentemente em suas conversas?",
        "answer": ""
      },
      "sayDo2": {
        "question": "Quais são os comportamentos ou ações mais comuns dele(a)?",
        "answer": ""
      }
    }
  };

  public empathyMap: string | null = "";
  private openai: OpenAI;

  constructor(private http: HttpClient) {
    this.openai = new OpenAI({
      apiKey: '',
      dangerouslyAllowBrowser: true
    });
  }

  async submitFirstAswers() {
    let prompt: string = this.generateFirstPrompt(JSON.stringify(this.firstQuestionsAndAnswers));

    let response = await this.openai.chat.completions.create({
      messages: [{role: "system", content: prompt}],
      model: "gpt-3.5-turbo",
    });

    let dale = response.choices[0].message.content;
    console.log(dale);

  }

  async submitFinalAnswers() {
    let prompt: string = this.generateFinalPrompt(JSON.stringify(this.firstQuestionsAndAnswers));
    let response = await this.openai.chat.completions.create({
      messages: [{role: "system", content: prompt}],
      model: "gpt-3.5-turbo",
    });

    this.empathyMap = response.choices[0].message.content;
    console.log(response);
  }

  private generateFirstPrompt(message: string): string {
    return `
    Com base em nessas perguntas e respostas sobre os 4 principais quadrantes de um mapa de empatia:

    ${message}

    me devolva um array com 2 objetos nesses moldes:
    [
       {
          "theme":"Quais são suas dores?",
          "pain1":{
             "question":""
          },
          "pain2":{
             "question":""
          }
       },
       {
          "theme":"Quais são seus ganhos?",
          "gain1":{
             "question":""
          },
          "gain2":{
             "question":""
          }
       }
    ]
  `;
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
