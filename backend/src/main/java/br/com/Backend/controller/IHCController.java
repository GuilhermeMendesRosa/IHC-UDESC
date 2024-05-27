package br.com.Backend.controller;

import br.com.Backend.service.IHCService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IHCController {

    @Autowired
    private IHCService service;

    @PostMapping("/generate")
    public ResponseEntity generateEmpathyMap(@RequestBody String requestData) {
        JSONObject response = this.service.generateEmpathyMap(requestData);

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(response.toString());
    }

}