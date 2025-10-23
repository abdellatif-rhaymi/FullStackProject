package org.cours.tp7.modele;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProprietaireRepo extends CrudRepository<Proprietaire, Long> {
}
