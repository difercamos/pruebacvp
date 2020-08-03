package com.linux.project.model;

import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.List;

import javax.persistence.OneToMany;
import com.linux.project.model.Person;

@Entity
@Table(name = "Country")
public class Country {
  @Id
  @GeneratedValue
  private Long id;

  private String name;

  @OneToMany(mappedBy = "country")
  List<Person> persons;

  Country() {}

  Country(String name) {
    this.name = name;
  }

  public Long getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Country)) return false;
    Country country = (Country) o;
    return (
      Objects.equals(this.id, country.id) &&
      Objects.equals(this.name, country.name)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.id, this.name);
  }

  @Override
  public String toString() {
    return (
      "Country{" +
      "id=" +
      this.id +
      ", name='" +
      this.name +
      '\'' +
      '}'
    );
  }
}
