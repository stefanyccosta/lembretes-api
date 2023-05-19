package com.github.stefanyccosta.lembretesAPI.dtos;

import lombok.Data;

// Classe para encapsular as requisições feitas pelo frontend
@Data
public class CriarLembreteRequest {
    private String nome;
    private String data;
}
