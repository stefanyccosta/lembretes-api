package com.github.stefanyccosta.lembretesAPI.controladores;

import com.github.stefanyccosta.lembretesAPI.dtos.CriarLembreteRequest;
import com.github.stefanyccosta.lembretesAPI.entidades.Lembrete;
import com.github.stefanyccosta.lembretesAPI.servicos.ServicoLembretes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ControladorLembretes {

    public final ServicoLembretes servicoLembretes;

    @PostMapping(value = "/lembretes")
    public ResponseEntity<Lembrete> criarLembrete(@RequestBody CriarLembreteRequest request) {
        try {
            Lembrete lembrete = this.servicoLembretes.criarLembrete(request.getNome(), request.getData());
            String url = "lembretes/"+lembrete.getId();
            return ResponseEntity.created(URI.create(url)).body(lembrete);
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    @GetMapping(value = "/lembretes")
    public ResponseEntity<List<Lembrete>> recuperarTodosLembretes() {
        List<Lembrete> lembretes =  this.servicoLembretes.recuperarTodosLembretes();
        return ResponseEntity.ok(lembretes);
    }

    @DeleteMapping(value = "/lembretes/{id}")
    public ResponseEntity<Void> deletarLembrete(@PathVariable("id") Long id) {
        servicoLembretes.deletarLembrete(id);
        return ResponseEntity.noContent().build();
    }
}
