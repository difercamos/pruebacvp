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
@Table(name = "TypeDocument")
public class TypeDocument {
  @Id
  @GeneratedValue
  private Long id;

  private String name;
  private String description;

  @OneToMany(mappedBy = "document")
  List<Person> persons;

  TypeDocument() {}

  TypeDocument(String name, String description) {
    this.name = name;
    this.description = description;
  }

  public Long getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }

  public String getDescription() {
    return this.description;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof TypeDocument)) return false;
    TypeDocument typeDocument = (TypeDocument) o;
    return (
      Objects.equals(this.id, typeDocument.id) &&
      Objects.equals(this.name, typeDocument.name) &&
      Objects.equals(this.name, typeDocument.description)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.id, this.name, this.description);
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
      ", description='" +
      this.description +
      '\'' +
      '}'
    );
  }
}
