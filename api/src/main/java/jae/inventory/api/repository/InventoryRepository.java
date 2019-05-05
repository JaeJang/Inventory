package jae.inventory.api.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import jae.inventory.api.entity.Category;
import jae.inventory.api.entity.Inventory;
import jae.inventory.api.entity.Item;



@Repository
public interface InventoryRepository extends CrudRepository<Inventory, Integer> {
	List<Inventory> findByCateIdIn(List<Category> cateId);
	Inventory getById(Integer id);
	Inventory getByItemIn(Item item);
}
