package com.financial.repository;

import com.financial.model.Auditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import java.util.List;

@NoRepositoryBean
public interface IGenericRepository<E extends Auditable,T> extends JpaRepository<E,T> {
    @Query(value = "SELECT e FROM #{#entityName} e WHERE e.deleted = false")
    List<E> findAllActive();


    @Query(value = "SELECT e FROM #{#entityName} e WHERE e.deleted = false " +
            "ORDER BY e.createdAt DESC")
    List<E> findAllActiveOrderByCreatedDate();


    @Modifying
    @Query(value = "UPDATE #{#entityName} e " +
            "SET e.deleted = true, " +
            "e.lastModifiedAt = CURRENT_TIMESTAMP, " +
            "e.lastModifiedBy = :username " +
            "WHERE e.id = :id")
    void softDelete(@Param("id") T id, @Param("username") String username);
}
