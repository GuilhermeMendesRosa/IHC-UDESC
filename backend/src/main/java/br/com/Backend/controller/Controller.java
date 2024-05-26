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
                Eu tenho este JSON com perguntas: 
                {0}
                    
                Com base neste JSON com as perguntas e respostas, retorne um mapa de empatia em um JSON com estes campos: O que ele(a) vê?, O que ele(a) ouve?, O que ele(a) pensa e sente?, O que ele(a) fala e faz?, Quais são suas dores? e Quais são seus ganhos?
                """, requestData);

        String response = chatClient.call(message);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
}