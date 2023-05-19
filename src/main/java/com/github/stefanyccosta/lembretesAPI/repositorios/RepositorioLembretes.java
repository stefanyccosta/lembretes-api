package com.github.stefanyccosta.lembretesAPI.repositorios;

import com.github.stefanyccosta.lembretesAPI.entidades.Lembrete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioLembretes extends JpaRepository<Lembrete, Long> {
}
