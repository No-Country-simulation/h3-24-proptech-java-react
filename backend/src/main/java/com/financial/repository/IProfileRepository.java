package com.financial.repository;

import com.financial.model.Profile;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface IProfileRepository extends IGenericRepository<Profile, UUID> {
    @Query(value = "SELECT * FROM profiles p WHERE p.user_id = :userId", nativeQuery = true)
    Optional<Profile> findByUserId(@Param("userId") UUID userId);

    @Query(value = "SELECT p FROM profiles p inner join users u on u.dni = :dni",nativeQuery = true)
    Optional<Profile> findByUserDni(@Param("dni") String dni);
}
