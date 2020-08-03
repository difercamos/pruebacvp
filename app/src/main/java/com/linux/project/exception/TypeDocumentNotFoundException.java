package com.linux.project.exception;

public class TypeDocumentNotFoundException extends RuntimeException {

  public TypeDocumentNotFoundException(Long id) {
    super("Could not find type document " + id);
  }
}