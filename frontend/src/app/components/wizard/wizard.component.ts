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
    session1: {
      theme: "O que ele(a) vê?",
      see1: {
        question: "Quais são os principais desafios ou problemas que ele(a) vê ao seu redor?",
        answer: ""
      },
      see2: {
        question: "Que tipo de ambiente ele(a) está frequentemente inserido (ex. trabalho, casa, comunidade)?",
        answer: ""
      },
      see3: {
        question: "Quais são as tendências ou mudanças que ele(a) nota em seu entorno?",
        answer: ""
      }
    },
    session2: {
      theme: "O que ele(a) ouve?",
      hear1: {
        question: "Quais são as principais fontes de informação e influência na vida dele(a) (ex. mídia, amigos, família)?",
        answer: ""
      },
      hear2: {
        question: "Que tipo de feedback ou conselhos ele(a) costuma receber?",
        answer: ""
      },
      hear3: {
        question: "Que tipo de música, podcasts ou outras mídias ele(a) consome regularmente?",
        answer: ""
      }
    },
    session3: {
      theme: "O que ele(a) pensa e sente?",
      thinkFeel1: {
        question: "Quais são as maiores preocupações ou medos dele(a) atualmente?",
        answer: ""
      },
      thinkFeel2: {
        question: "Quais são as aspirações ou objetivos de longo prazo dele(a)?",
        answer: ""
      },
      thinkFeel3: {
        question: "Como ele(a) se sente em relação aos desafios que enfrenta no dia a dia?",
        answer: ""
      }
    },
    session4: {
      theme: "O que ele(a) fala e faz?",
      sayDo1: {
        question: "Que tipo de conversas ele(a) tem frequentemente (ex. tópicos discutidos)?",
        answer: ""
      },
      sayDo2: {
        question: "Quais são as ações ou comportamentos mais comuns dele(a)?",
        answer: ""
      },
      sayDo3: {
        question: "Como ele(a) se expressa publicamente (ex. redes sociais, eventos)?",
        answer: ""
      }
    },
    session5: {
      theme: "Quais são suas dores?",
      pain1: {
        question: "Quais são os obstáculos que mais impedem ele(a) de alcançar seus objetivos?",
        answer: ""
      },
      pain2: {
        question: "Que tipo de frustrações ou dificuldades ele(a) enfrenta regularmente?",
        answer: ""
      },
      pain3: {
        question: "Que problemas ele(a) sente que não consegue resolver sozinho(a)?",
        answer: ""
      }
    },
    session6: {
      theme: "Quais são seus ganhos?",
      gain1: {
        question: "O que motiva ele(a) a continuar em frente, mesmo diante de dificuldades?",
        answer: ""
      },
      gain2: {
        question: "Quais são as pequenas vitórias ou sucessos que ele(a) celebra?",
        answer: ""
      },
      gain3: {
        question: "Que tipo de recompensas ou benefícios ele(a) espera obter no futuro?",
        answer: ""
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
