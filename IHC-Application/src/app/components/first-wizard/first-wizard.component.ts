import {Component} from '@angular/core';
import {PoFieldModule, PoModule, PoStepperModule} from '@po-ui/ng-components';
import {FormsModule} from "@angular/forms";
import OpenAI from "openai";
import {Router} from "@angular/router";
import {Chat} from "openai/resources";
import ChatCompletion = Chat.ChatCompletion;

@Component({
  selector: 'app-first-wizard',
  standalone: true,
  templateUrl: './first-wizard.component.html',
  imports: [
    PoStepperModule,
    PoFieldModule,
    FormsModule,
    PoModule
  ],
  styleUrls: ['./first-wizard.component.css']
})
export class FirstWizardComponent {
  questionsAndAnswers: any = {
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

  constructor(private router: Router) {
    this.openai = new OpenAI({
      apiKey: '',
      dangerouslyAllowBrowser: true
    });
  }

  async submitFirstAswers() {
    let prompt: string = this.generateFirstPrompt(JSON.stringify(this.questionsAndAnswers));

    let response = await this.openai.chat.completions.create({
      messages: [{role: "system", content: prompt}],
      model: "gpt-4",
    });

    this.appendQuestionsAndAnswers(response);
    this.router.navigateByUrl('/second-wizard', { state: { questionsAndAnswers: this.questionsAndAnswers } });

    console.log(this.questionsAndAnswers);
  }

  private appendQuestionsAndAnswers(response: ChatCompletion) {
    let objectsArray: any[] = JSON.parse(<string>response.choices[0].message.content);
    this.questionsAndAnswers.session5 = objectsArray[0];
    this.questionsAndAnswers.session6 = objectsArray[1];
  }

  private generateFirstPrompt(message: string): string {
    return `
    Com base nessas perguntas e respostas sobre os 4 principais quadrantes de um mapa de empatia:

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

    PREENCHA OS CAMPOS question COM O QUE VOCÊ GEROU COM BASE NAS PERGUNTAS E RESPOSTAS ANTERIORES, TENHA CERTEZA QUE NUNCA VIRÁ VAZIO!
  `;
  }

}
