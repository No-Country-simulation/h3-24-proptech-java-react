package com.financial.repository;

import com.financial.model.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;


@Repository
public interface IRoleRepository extends IGenericRepository<Role, UUID>{
    @Query(value = "SELECT r from  Role r where r.name = :name")
    Optional<Role> findRoleByName(@Param("name") String name);
}
