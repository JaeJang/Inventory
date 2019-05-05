package jae.inventory.api.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "Inventory")
public class Inventory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	@OneToOne(cascade = CascadeType.ALL)
	//@PrimaryKeyJoinColumn
	@JoinColumn(name="item_id")
	@NotBlank(message = "item id cannot be blank")
	private Item item_id;
	
	@ManyToOne
//	@PrimaryKeyJoinColumn
	@JoinColumn(name="cate_id")
	@NotBlank(message = "cate_id cannot be blank")
	private Category cate;
	
	@NotBlank(message = "Quantity cannot be blank")
	@Column(name="quantity")
	private Integer quantity;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Item getItem_id() {
		return item_id;
	}

	public void setItem_id(Item item_id) {
		this.item_id = item_id;
	}

	public Category getCate_id() {
		return cate;
	}

	public void setCate_id(Category cate_id) {
		this.cate = cate_id;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	
}
