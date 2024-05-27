package br.com.Backend.service;

import org.json.JSONObject;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;

@Service
public class IHCService {

    @Autowired
    private OpenAiChatClient chatClient;

    public JSONObject generateEmpathyMap(String requestData) {
        String message = MessageFormat.format("""
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

                {0}
                        
                Com base nesse JSON com perguntas e respostas, por favor, retorne um mapa de empatia detalhado e coeso, faça algo realmente bem completo. 
                Não só copie e cole o que eu mandei.
                """, requestData);


        String value = this.chatClient.call(message);

        JSONObject response = new JSONObject();
        response.put("value", value);
        return response;
    }

}
