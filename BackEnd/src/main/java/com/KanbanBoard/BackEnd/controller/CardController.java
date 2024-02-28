package com.KanbanBoard.BackEnd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.KanbanBoard.BackEnd.DTO.CardDTO;
import com.KanbanBoard.BackEnd.service.CardService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/KanbanBoard")
@CrossOrigin(origins = "http://localhost:3000") 
public class CardController {

    @Autowired
    private CardService service;

    @GetMapping
    public Flux<CardDTO> getCards(){
        return service.getCards();
    }

    @GetMapping("/{id}")
    public Mono<CardDTO> getCard(@PathVariable String id){
        return service.getCard(id);
    }
    
    @PostMapping
    public Mono<CardDTO> saveCard(@RequestBody Mono<CardDTO> CardDTOMono){
        return service.saveCard(CardDTOMono);
    }

    @PutMapping("/update/{id}")
    public Mono<CardDTO> updateCard(@RequestBody Mono<CardDTO> CardDTOMono, @PathVariable String id){
        return service.updateCard(CardDTOMono, id);
    }

    @DeleteMapping("/delete/{id}")
    public Mono<Void> deleteCard(@PathVariable String id){
        return service.deleteCard(id);
    }
}
