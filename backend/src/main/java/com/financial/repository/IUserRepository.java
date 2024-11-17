package com.financial.repository;

import com.financial.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface IUserRepository extends IGenericRepository<User, UUID>{
    @Query("SELECT u FROM users u where users.email = :email")
    Optional<User> findUserByEmail(@Param("email") String email);
}
