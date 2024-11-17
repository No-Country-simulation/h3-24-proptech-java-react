package com.financial.repository;

import com.financial.model.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface IRoleRepository extends IGenericRepository<Role, UUID>{
    @Query(value = "SELECT r from  roles r where r.name = :name")
    Optional<Role> findRoleByName(@Param("name") String name);
}
