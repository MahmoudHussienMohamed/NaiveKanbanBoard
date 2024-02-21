package com.KanbanBoard.BackEnd.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "cards")
public class Card {
    @Id
    private String id;
    private String title;
    private String description;
    private String colName;
    private int colIndex;
}
