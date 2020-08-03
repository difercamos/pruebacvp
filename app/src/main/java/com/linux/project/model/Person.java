package com.linux.project.model;

import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.ManyToOne;

import com.linux.project.model.TypeDocument;
import com.linux.project.model.Country;

@Entity
@Table(name = "Person")
public class Person {
  @Id
  @GeneratedValue
  private Long id;

  private String name;
  private String lastName;
  private String numberDocument;
  private String genero;
  private int age;
  @ManyToOne
  private TypeDocument document;
  @ManyToOne
  private Country country;

  Person() {}

  Person(String name, String lastName, String numberDocument, String genero, int age, TypeDocument document, Country country) {
    this.name = name;
    this.lastName = lastName;
    this.numberDocument = numberDocument;
    this.genero = genero;
    this.age = age;
    this.document = document;
    this.country = country;
  }

  public Long getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }

  public String getLastName() {
    return this.lastName;
  }

  public String getNumberDocument() {
    return this.numberDocument;
  }

  public String getGenero() {
    return this.genero;
  }

  public int getAge() {
    return this.age;
  }

  public TypeDocument getDocument() {
    return this.document;
  }

  public Country getCountry() {
    return this.country;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public void setNumberDocument(String numberDocument) {
    this.numberDocument = numberDocument;
  }

  public void setGenero(String genero) {
    this.genero = genero;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public void setDocument(TypeDocument document) {
    this.document = document;
  }

  public void setCountry(Country country) {
    this.country = country;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Person)) return false;
    Person person = (Person) o;
    return (
      Objects.equals(this.id, person.id) &&
      Objects.equals(this.name, person.name) &&
      Objects.equals(this.lastName, person.lastName) &&
      Objects.equals(this.numberDocument, person.numberDocument) &&
      Objects.equals(this.genero, person.genero) &&
      Objects.equals(this.age, person.age) &&
      Objects.equals(this.document, person.document) &&
      Objects.equals(this.country, person.country)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.id, this.name, this.lastName, this.numberDocument, this.genero, this.age, this.document, this.country);
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
      ", lastName='" +
      this.lastName +
      '\'' +
      ", numberDocument='" +
      this.numberDocument +
      '\'' +
      ", genero='" +
      this.genero +
      '\'' +
      ", age='" +
      this.age +
      '\'' +
      ", document='" +
      this.document +
      '\'' +
      ", country='" +
      this.country +
      '\'' +
      '}'
      
    );
  }
}
