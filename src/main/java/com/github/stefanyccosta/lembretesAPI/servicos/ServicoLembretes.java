package com.github.stefanyccosta.lembretesAPI.servicos;

import com.github.stefanyccosta.lembretesAPI.entidades.Lembrete;
import com.github.stefanyccosta.lembretesAPI.repositorios.RepositorioLembretes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ServicoLembretes {

    private final RepositorioLembretes repositorioLembretes;

    public Lembrete criarLembrete(String nome, String dataEmString) {

        //Confere se o nome está vazio
        if(nome == null || nome.isEmpty()) {
            throw new IllegalArgumentException("Nome não pode ser vazio");
        }

        //Confere se a data é válida
        LocalDate data;
        try {
            DateTimeFormatter formatadorDeData = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            data = LocalDate.parse(dataEmString, formatadorDeData);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("A data deve ser no formato dd-MM-yyyy");
        }

        //Confere se a data está no passado
        if (LocalDate.now().isAfter(data)) {
            throw new IllegalArgumentException("Data não pode estar no passado");
        }

        Lembrete lembrete = new Lembrete(nome, data);

        //Salva do banco de dados e retorna o novo lembrete
        return this.repositorioLembretes.save(lembrete);
    }

    public List<Lembrete> recuperarTodosLembretes() {
        // Recupera todos os lembretes do banco de dados
        return this.repositorioLembretes.findAll();
    }

    public void deletarLembrete(Long id) {
        //Deleta um lembrete específico(id) no banco de dados
        this.repositorioLembretes.deleteById(id);
    }
}
