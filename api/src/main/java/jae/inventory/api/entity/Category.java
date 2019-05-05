package jae.inventory.api.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Category")
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="cate_id")
	private Integer cate_id;
	
	//@NotBlank(message ="Name cannot be blank")
	@Column(name="name")
	private String name;
	
	//@PrimaryKeyJoinColumn
	@JoinColumn(name = "parent_id")
	@ManyToOne(cascade={CascadeType.ALL})
	private Category parent;

	public Integer getCate_id() {
		return cate_id;
	}

	public void setCate_id(Integer cate_id) {
		this.cate_id = cate_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Category getParent_id() {
		return parent;
	}

	public void setParent_id(Category parent) {
		this.parent = parent;
	}

	
	
}
