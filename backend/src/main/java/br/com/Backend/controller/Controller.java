package br.com.Backend.controller;

import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.MessageFormat;

@RestController
public class Controller {

    @Autowired
    private OpenAiChatClient chatClient;

    @PostMapping("/generate")
    public ResponseEntity generateEmpathyMap(@RequestBody String requestData) {
        String message = MessageFormat.format("""
                Você vai me ajudar a montar um mapa de empatia no formato JSON contendo as seguintes chaves:
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
                        
                Com base nesse JSON com perguntas e respostas, por favor, retorne um mapa de empatia detalhado e coeso.
                """, requestData);


        String response = chatClient.call(message);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
}