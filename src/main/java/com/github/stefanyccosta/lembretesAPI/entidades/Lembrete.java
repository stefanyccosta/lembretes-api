package com.github.stefanyccosta.lembretesAPI.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Lembrete {

    @Id
    @GeneratedValue
    private Long id;
    private String nome;
    private LocalDate data;

    public Lembrete(String nome, LocalDate data) {
        this.nome = nome;
        this.data = data;
    }
}
