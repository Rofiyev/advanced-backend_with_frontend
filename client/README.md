# !!! Project Guide !!!

## How to Write APIs

### Introduction

This document is a description of how we are (and should be) implementing our internal APIs in Node. Our APIs should support the use of our front-end and mobile applications.

If you are in one of the development departments, consider this your personal API bible. If you have any questions about how to format a response code or URL, refer to this document. If something is not described here, submit a pull request or contact any backend developer at Node.

We all know that not all projects are the same. So at some point you may need to bend the rules, use a different convention, or even the "wrong" response code. That's okay, just go over it with your colleagues and let them know who is implementing the API when you change it.

### Endpoints

Endpoints with direct, readable URLs are what make an API great. So, to make things easy and convenient for you, we've figured out how to do it. No more wondering if it should be plural or where to put the slug.

### Anatomy of an Endpoint

All URLs are for data manipulation

```
/api/posts/**
```

```
/api/auth/**
```

### Request Methods

A request method is a way to differentiate what action is being "asked" from our endpoint. For example, `GET` is pretty much self-explanatory. But there are a few other methods that we use frequently.

| Method | Description |
| -------- | --------------------------------------- |
| `GET` | Used to retrieve a single element or set of elements. |
| `POST` | Used to create new things, e.g. new user, post, comment, etc. |
| `PATCH` | Used to update one or more fields in an element, e.g. updating a user's email address. |
| `PUT` | Used to replace the entire element (all fields) with new data. |
| `DELETE` | Used to delete an element. |
