package com.financial.repository;

import com.financial.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;


@Repository
public interface IUserRepository extends IGenericRepository<User, UUID>{
    @Query("SELECT u FROM User u where u.email = :email")
    Optional<User> findUserByEmail(@Param("email") String email);
}
