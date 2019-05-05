package jae.inventory.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import jae.inventory.api.entity.Inventory;



@Repository
public interface InventoryRepository extends CrudRepository<Inventory, Integer> {

}
