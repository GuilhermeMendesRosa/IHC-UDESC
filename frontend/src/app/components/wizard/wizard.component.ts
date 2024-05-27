import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PoFieldModule, PoModule, PoStepperModule, PoStepperStatus} from '@po-ui/ng-components';
import {FormsModule} from "@angular/forms";

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
    },
    "session5": {
      "theme": "Quais são suas dores?",
      "pain1": {
        "question": "Quais são os obstáculos que mais impedem ele(a) de alcançar seus objetivos?",
        "answer": ""
      },
      "pain2": {
        "question": "Que tipo de frustrações ou dificuldades ele(a) enfrenta regularmente?",
        "answer": ""
      }
    },
    "session6": {
      "theme": "Quais são seus ganhos?",
      "gain1": {
        "question": "O que motiva ele(a) a continuar em frente, mesmo diante de dificuldades?",
        "answer": ""
      },
      "gain2": {
        "question": "Quais são as pequenas vitórias ou sucessos que ele(a) celebra?",
        "answer": ""
      }
    }
  };
  empathyMap: string = "";

  constructor(private http: HttpClient) {
  }

  onStepChange(event: PoStepperStatus) {
    console.log('Current step:', event);
  }

  submitAnswers() {
    const url = 'http://localhost:8080/generate';
    this.http.post(url, this.questionsAndAnswers).subscribe(
      (response: any) => {
        console.log(response)
        this.empathyMap = JSON.stringify(response);
        console.log('Resposta enviada com sucesso', response);
      },
      (error: any) => {
        console.error('Erro ao enviar a resposta', error);
      }
    );
  }

}
