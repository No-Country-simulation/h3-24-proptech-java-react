package com.financial.repository;

import com.financial.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;


@Repository
public interface IUserRepository extends JpaRepository<User, UUID> {
    @Query(value = "SELECT * FROM users u WHERE u.email = :email", nativeQuery = true)
    Optional<User> findUserByEmail(@Param("email") String email);

    @Query(value = "SELECT * FROM users u where u.dni = :dni",nativeQuery = true)
    Optional<User> findUserByDni(@Param("dni") String dni);

    Optional<User> findByResetPasswordToken(String resetPasswordToken);

    @Transactional
    @Modifying
    @Query(value = "UPDATE users SET is_verified = :isVerified WHERE user_id = :userId", nativeQuery = true)
    void isVerified(@Param("isVerified") Boolean isVerified, @Param("userId") UUID userId);

    Optional<User> findById(UUID userId);
}
