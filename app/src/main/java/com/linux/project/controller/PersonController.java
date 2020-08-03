package com.linux.project.controller;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.linux.project.repository.PersonRepository;
import com.linux.project.model.Person;
import com.linux.project.exception.PersonNotFoundException;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class PersonController {

  private final PersonRepository repository;

  PersonController(PersonRepository repository) {
    this.repository = repository;
  }

  // Aggregate root

  @GetMapping("/persons")
  List<Person> all() {
    return repository.findAll();
  }

  @PostMapping("/persons")
  Person newPerson(@RequestBody Person newPerson) {
    return repository.save(newPerson);
  }

  // Single item

  @GetMapping("/persons/{id}")
  Person one(@PathVariable Long id) {
    return repository
      .findById(id)
      .orElseThrow(() -> new PersonNotFoundException(id));
  }

  @PutMapping("/persons/{id}")
  Person replacePerson(
    @RequestBody Person newPerson,
    @PathVariable Long id
  ) {
    return repository
      .findById(id)
      .map(
        person -> {
          person.setName(newPerson.getName());
          person.setLastName(newPerson.getLastName());
          person.setNumberDocument(newPerson.getNumberDocument());
          person.setGenero(newPerson.getGenero());
          person.setAge(newPerson.getAge());
          person.setDocument(newPerson.getDocument());
          person.setCountry(newPerson.getCountry());
          return repository.save(person);
        }
      )
      .orElseGet(
        () -> {
          newPerson.setId(id);
          return repository.save(newPerson);
        }
      );
  }

  @DeleteMapping("/persons/{id}")
  void deletePerson(@PathVariable Long id) {
    repository.deleteById(id);
  }
}
