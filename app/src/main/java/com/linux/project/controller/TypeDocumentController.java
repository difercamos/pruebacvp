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

import com.linux.project.repository.TypeDocumentRepository;
import com.linux.project.model.TypeDocument;
import com.linux.project.exception.TypeDocumentNotFoundException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class TypeDocumentController {

  private final TypeDocumentRepository repository;

  TypeDocumentController(TypeDocumentRepository repository) {
    this.repository = repository;
  }

  // Aggregate root

  @GetMapping("/types")
  List<TypeDocument> all() {
    return repository.findAll();
  }

  @PostMapping("/types")
  TypeDocument newTypeDocument(@RequestBody TypeDocument newTypeDocument) {
    return repository.save(newTypeDocument);
  }

  // Single item

  @GetMapping("/types/{id}")
  TypeDocument one(@PathVariable Long id) {
    return repository
      .findById(id)
      .orElseThrow(() -> new TypeDocumentNotFoundException(id));
  }

  @PutMapping("/types/{id}")
  TypeDocument replaceTypeDocument(
    @RequestBody TypeDocument newTypeDocument,
    @PathVariable Long id
  ) {
    return repository
      .findById(id)
      .map(
        type -> {
          type.setName(newTypeDocument.getName());
          return repository.save(type);
        }
      )
      .orElseGet(
        () -> {
          newTypeDocument.setId(id);
          return repository.save(newTypeDocument);
        }
      );
  }

  @DeleteMapping("/types/{id}")
  void deleteTypeDocument(@PathVariable Long id) {
    repository.deleteById(id);
  }
}
