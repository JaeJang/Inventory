package jae.inventory.api.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity

@Table(name = "Inventory")
public class Inventory {
	
	//PRIMARY KEY
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	//FORIEGN KEY REFERENCES Item(itemId) ON DELETE CASCADE
	@ManyToOne
	@JoinColumn(name = "item", nullable = false)
	private Item item;
	
	//FORIEGN KEY REFERENCES Category(cateId) ON DELETE CASCADE
	@ManyToOne
	@JoinColumn(name = "cateId", nullable = false)
	private Category cateId;
	
	@Column(name = "quantity", nullable = false)
	private Integer quantity;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public Category getCateId() {
		return cateId;
	}

	public void setCateId(Category cateId) {
		this.cateId = cateId;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	
	
}
