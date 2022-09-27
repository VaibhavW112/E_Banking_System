package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojo.DebitCard;

public interface DebitcardRepository extends JpaRepository<DebitCard, Integer> {

	@Query("select d from DebitCard d where d.account.accountId=:accid")
	DebitCard getDebitcardFromAccount(@Param(value = "accid") int accid);
}
