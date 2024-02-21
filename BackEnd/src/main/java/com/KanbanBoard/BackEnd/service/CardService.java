package com.KanbanBoard.BackEnd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.KanbanBoard.BackEnd.repository.CardRepository;
import com.KanbanBoard.BackEnd.utils.AppUtils;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.KanbanBoard.BackEnd.DTO.CardDTO;

@Service
public class CardService {
    @Autowired
    private CardRepository repository;
    
     public Flux<CardDTO> getCards(){
        return repository.findAll().map(AppUtils::entityToDTO);
    }

    public Mono<CardDTO> getCard(String id){
        return repository.findById(id).map(AppUtils::entityToDTO);
    }

    public Mono<CardDTO> saveCard(Mono<CardDTO> CardDTOMono){
      return  CardDTOMono.map(AppUtils::DTOToEntity)
                .flatMap(repository::insert)
                .map(AppUtils::entityToDTO);
    }

    public Mono<CardDTO> updateCard(Mono<CardDTO> CardDTOMono, String id){
       return repository.findById(id)
                .flatMap(p->CardDTOMono.map(AppUtils::DTOToEntity)
                .doOnNext(e->e.setId(id)))
                .flatMap(repository::save)
                .map(AppUtils::entityToDTO);

    }

    public Mono<Void> deleteCard(String id){
        return repository.deleteById(id);
    }
}
