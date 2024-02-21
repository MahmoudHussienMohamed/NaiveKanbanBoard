package com.KanbanBoard.BackEnd.utils;

import org.springframework.beans.BeanUtils;
import com.KanbanBoard.BackEnd.DTO.CardDTO;
import com.KanbanBoard.BackEnd.entity.Card;

public class AppUtils {
    public static CardDTO entityToDTO(Card card){
        CardDTO cardDTO = new CardDTO();
        BeanUtils.copyProperties(card, cardDTO);
        return cardDTO;
    }
    public static Card DTOToEntity(CardDTO cardDTO){
        Card card = new Card();
        BeanUtils.copyProperties(cardDTO, card);
        return card;
    }
}
