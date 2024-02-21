package com.KanbanBoard.BackEnd.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardDTO {
    private String id;
    private String title;
    private String description;
    private String colName;
    private int colIndex;
}
