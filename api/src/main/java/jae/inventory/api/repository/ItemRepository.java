package jae.inventory.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import jae.inventory.api.entity.Item;

@Repository
public interface ItemRepository extends CrudRepository<Item, Integer>{
	Item getByItemId(Integer itemId);
}
