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
        String message = MessageFormat.format("Com base nesse JSON: {0} com pergunt sobre os 6 seçoes do mapa de empatia, devolva um mapa de empatia em json", requestData);
        String response = chatClient.call(message);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
}