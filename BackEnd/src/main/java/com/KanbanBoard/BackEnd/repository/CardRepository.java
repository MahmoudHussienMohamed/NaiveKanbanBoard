package com.KanbanBoard.BackEnd.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import com.KanbanBoard.BackEnd.entity.Card;

@Repository
public interface CardRepository extends ReactiveMongoRepository<Card, String>{
}
